const express = require('express');
const admin = require('firebase-admin');
const path = require('path');

try {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    process.exit(1);
}

const app = express();

app.use(express.json());
app.use(express.static('public'));

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

const validateRole = (req, res, next) => {
    const { role } = req.body;
    const validRoles = ['admin', 'moderator'];
    
    if (role && !validRoles.includes(role)) {
        return res.status(400).json({
            success: false,
            message: `Invalid role. Must be one of: ${validRoles.join(', ')}`
        });
    }
    next();
};

const validateUID = (req, res, next) => {
    const { uid } = req.body;
    if (!uid || typeof uid !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Valid user ID is required'
        });
    }
    next();
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/users-with-claims', async (req, res, next) => {
    try {
        const listUsersResult = await admin.auth().listUsers();
        const usersWithClaims = listUsersResult.users
            .filter(user => user.customClaims && Object.keys(user.customClaims).length > 0)
            .map(user => ({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                claims: user.customClaims
            }));
        res.json({ success: true, users: usersWithClaims });
    } catch (error) {
        next(error);
    }
});

app.get('/api/all-users', async (req, res, next) => {
    try {
        const listUsersResult = await admin.auth().listUsers();
        const users = listUsersResult.users.map(user => ({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            claims: user.customClaims
        }));
        res.json({ success: true, users });
    } catch (error) {
        next(error);
    }
});

app.post('/api/setRole', [validateUID, validateRole], async (req, res, next) => {
    const { uid, role } = req.body;
    try {
        await admin.auth().getUser(uid);
        const claims = { [role]: true };
        await admin.auth().setCustomUserClaims(uid, claims);
        res.json({ 
            success: true, 
            message: `Role ${role} set for user ${uid}`,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        } else {
            next(error);
        }
    }
});

app.post('/api/removeRole', validateUID, async (req, res, next) => {
    const { uid } = req.body;
    try {
        await admin.auth().getUser(uid);
        await admin.auth().setCustomUserClaims(uid, null);
        res.json({ 
            success: true, 
            message: `Role removed for user ${uid}`,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        } else {
            next(error);
        }
    }
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});