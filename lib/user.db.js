import { db } from '@/firebase.config';
import { setDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import bcrypt from 'bcryptjs';

// POST USER TO DATABASE
export const addNewUser = async (user, uid) => {
    try {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(user.password, salt);

        await setDoc(doc(db, 'users', uid), {
            name: user.name,
            email: user.email,
            password: hashedPassword,
            id: uid,
        });
        
    } catch (error) {
        toast.error('Failed to add user: ', error);
    }
}