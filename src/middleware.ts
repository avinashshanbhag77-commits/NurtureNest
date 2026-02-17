import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
});

export const config = {
    matcher: [
        "/tracker",
        "/nutrition",
        "/wellness",
        "/ai-support",
        "/community",
        "/dashboard",
        "/appointments",
        "/pricing",
        "/checkout"
    ],
};
