import Footer from "../components/Footer";
import Navbar from "../components/Navbar"

export function Cart() {
    return (
        <>
            <Navbar />
            <main className="relative">
                <h1 className="text-lg font-bold mb-6">Mi carrito</h1>
            </main>
            <Footer />
        </>
    );
}
