import { Poppins, Geist } from "next/font/google";
import Theme_Mode_Provider from "../components/Theme_Mode_Provider";
import Global_Context_Provider from "../components/Global_Context_Provider";
import "./globals.css";

const poppins = Geist({ weight: ["400", "700", "900"], subsets: ["latin"] });

export const metadata = {
    title: "JA Portolio",
    description: "Josevanio Antonio's dev portfolio",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${poppins.className} dark:text-light_font dark:bg-dark_background`}>
                <Theme_Mode_Provider>
                    <Global_Context_Provider>{children}</Global_Context_Provider>
                </Theme_Mode_Provider>
            </body>
        </html>
    );
}
