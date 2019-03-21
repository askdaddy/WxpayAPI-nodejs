import * as os from 'os';

export class Utils {
    static getRemoteIp(): string[] {
        const iface = os.networkInterfaces();
        const addr: string[] = [];
        for (const i in iface) {
            for (const j in iface[i]) {
                const ip = iface[i][j];
                if (ip.family === 'IPv4' && !ip.internal) {
                    addr.push(ip.address);
                }
            }
        }
        return addr;
    }
}