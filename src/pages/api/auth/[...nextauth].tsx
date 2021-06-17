import NextAuth from "next-auth";
import Providers from "next-auth/providers";

interface CredentialObject {
  username: string;
  password: string;
}

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "TheAroidHouseAccount",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: CredentialObject) {
        const { username, password } = credentials;

        const validUsernames = process.env.USERNAMES!.split(",");
        const validPasswords = process.env.PASSWORDS!.split(",");

        const isValidUser = validUsernames.includes(username);
        const isValidPassword = validPasswords.includes(password);

        if (isValidUser && isValidPassword) {
          return { name: username, email: process.env.ADMIN_EMAIL };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    async redirect(url: string, baseUrl: string): Promise<string> {
      return `${baseUrl}/admin`;
    },
  },
});
