import { createPool } from "mysql2/promise";
import properties from './properties';

export async function connect() {
    return await createPool(properties.database);
}