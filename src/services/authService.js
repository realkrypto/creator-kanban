const USERS_KEY = 'ugc_dashboard_users';
const CURRENT_USER_KEY = 'ugc_dashboard_current_user';

const SUPER_ADMIN_EMAIL = 'bryan.song@overdare.com';

// Helper to get users from local storage
const getUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

// Helper to save users to local storage
const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authService = {
    login: (email, password) => {
        // Super Admin Bypass (Auto-create if not exists)
        if (email === SUPER_ADMIN_EMAIL) {
            const users = getUsers();
            let admin = users.find(u => u.email === email);
            if (!admin) {
                admin = { email, password, role: 'admin', status: 'approved' };
                users.push(admin);
                saveUsers(users);
            } else if (admin.password !== password) {
                // In a real app we'd check hash, here we just check plain text
                // For demo purposes, if password doesn't match, we fail. 
                // But since we just auto-created, let's assume correct for the very first login or just check.
                if (admin.password !== password) return { success: false, message: 'Invalid credentials' };
            }

            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(admin));
            return { success: true, user: admin };
        }

        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, message: 'Invalid credentials' };
        }

        if (user.status !== 'approved') {
            return { success: false, message: 'Account pending approval' };
        }

        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return { success: true, user };
    },

    signup: (email, password) => {
        const users = getUsers();

        if (users.find(u => u.email === email)) {
            return { success: false, message: 'User already exists' };
        }

        // Auto-approve super admin if they sign up manually
        const isSuperAdmin = email === SUPER_ADMIN_EMAIL;

        const newUser = {
            email,
            password,
            role: isSuperAdmin ? 'admin' : 'user',
            status: isSuperAdmin ? 'approved' : 'pending',
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        return { success: true, message: isSuperAdmin ? 'Admin account created' : 'Account created. Waiting for approval.' };
    },

    logout: () => {
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    getCurrentUser: () => {
        const user = localStorage.getItem(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    // Admin Functions
    getPendingUsers: () => {
        const users = getUsers();
        return users.filter(u => u.status === 'pending');
    },

    approveUser: (email) => {
        const users = getUsers();
        const userIndex = users.findIndex(u => u.email === email);
        if (userIndex > -1) {
            users[userIndex].status = 'approved';
            saveUsers(users);
            return true;
        }
        return false;
    },

    rejectUser: (email) => {
        const users = getUsers();
        const newUsers = users.filter(u => u.email !== email);
        saveUsers(newUsers);
        return true;
    }
};
