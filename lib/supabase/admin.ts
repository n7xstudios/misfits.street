import { createClient } from './server';
import { redirect } from 'next/navigation';

// For this implementation, we check if the user's email matches the admin email.
// In a production scenario, you would use Supabase Custom Claims or a `profiles` table with a `role` column.
const ADMIN_EMAILS = [
    process.env.ADMIN_EMAIL || 'admin@misfits.street'
];

export async function requireAdmin() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
        // Redirect non-admins away from the admin dashboard (e.g., to their account page or home)
        redirect('/account');
    }

    return user;
}
