import type { NextApiRequest, NextApiResponse } from 'next'
import { getNamesAndEmailsOfApprovedUsers } from '@/app/reads'
import { prisma } from '@/app/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    if (req.body.apikey === process.env.API_KEY) {
        // Signed in
        var usersThatWereClocked: { name: string | null; email: string | null }[] = [];
        const users = await getNamesAndEmailsOfApprovedUsers();
        for(const user of users) {
            const userToClockOut = await prisma.user.findUnique({
                where: { email: user?.email as string },
                include: { shifts: true },
            });

            var isClockedIn = false;
            for (const shift of userToClockOut?.shifts ?? []) {
                if (shift.shiftEnd === null) {
                    isClockedIn = true;
                }
            }

            if(!isClockedIn) {
                continue;
            }

            const latestShift =
                userToClockOut?.shifts.length && userToClockOut?.shifts.length > 0
                    ? userToClockOut?.shifts.reduce(
                        (newestShift, currentShift) => {
                            return currentShift.shiftStart.getTime() >
                                newestShift.shiftStart.getTime()
                                ? currentShift
                                : newestShift;
                        },
                        userToClockOut?.shifts[0],
                    )
                    : null;
            if (latestShift) {
                await prisma.shift.update({
                    data: { shiftEnd: new Date() },
                    where: { id: latestShift.id },
                });
                usersThatWereClocked.push(user);
            }
        }

        if(usersThatWereClocked.length == 0)
        {
            res.status(200);
            res.send("No users clocked out.")
        } else {
            res.status(200)
            res.send(JSON.stringify(usersThatWereClocked));
        }
    } else {
        // Not Signed in
        res.status(401)
    }
    res.end()
}