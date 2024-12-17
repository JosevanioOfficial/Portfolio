import Header from "../components/Header";
import HomeSection from "../components/HomeSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProjectsModal from "../components/ProjectsModal";

export default function Home() {
    return (
        <>
            <Header />

            <section className="relative" id="main_section">
                <ProjectsModal />
                <Navbar />
                <HomeSection />

                {/* <section className="w-full h-full hidden">
                    <div className="w-full bg-cyan-400 hidden" id="main_section">
                        <div className="bg-white_background dark:bg-black" id="showcase_carousel"></div>
                    </div>
                </section> */}
            </section>

            <Footer />
        </>
    );
}
