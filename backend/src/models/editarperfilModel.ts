import mysql, { RowDataPacket } from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST ?? "localhost",
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "appdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export interface UserProfile {
    id: number;
    nome?: string;
    email?: string;
    telefone?: string | null;
    bio?: string | null;
    avatarUrl?: string | null;
    senha?: string; // hashed
}

/**
 * Busca usuário por id
 */
export async function getUserById(id: number): Promise<UserProfile | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT id, nome, email, telefone, bio, avatarUrl FROM users WHERE id = ? LIMIT 1",
        [id]
    );
    const result = (rows as RowDataPacket[])[0];
    return result ? (result as unknown as UserProfile) : null;
}

/**
 * Atualiza campos do perfil.
 * profile pode conter qualquer subset de campos: nome, email, telefone, bio, avatarUrl.
 */
export async function updateProfile(id: number, profile: Partial<UserProfile>): Promise<boolean> {
    const allowed = ["nome", "email", "telefone", "bio", "avatarUrl"];
    const allowedSet = new Set(allowed);

    // filtra apenas chaves permitidas e ignora valores undefined (mas permite null)
    const entries = Object.entries(profile).filter(
        ([k, v]) => allowedSet.has(k) && v !== undefined
    );

    if (entries.length === 0) return false;

    // safe: nomes de colunas são validados contra allowedSet, então usamos backticks
    const sets = entries.map(([k]) => `\`${k}\` = ?`).join(", ");
    const values = entries.map(([, v]) => v);
    values.push(id);

    const [result] = await pool.query(`UPDATE users SET ${sets} WHERE id = ?`, values);
    return (result as any).affectedRows > 0;
}

/**
 * Atualiza senha (espera senha já hasheada)
 */
export async function updatePassword(id: number, hashedPassword: string): Promise<boolean> {
    const [result] = await pool.query("UPDATE users SET `senha` = ? WHERE id = ?", [hashedPassword, id]);
    return (result as any).affectedRows > 0;
}

export default {
    getUserById,
    updateProfile,
    updatePassword,
};