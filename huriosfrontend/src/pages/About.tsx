import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

export function About() {
    return (
        <>
        <main className="relative">
            <Navbar />
            <div className="flex flex-col items-start gap-6 p-4 max-w-7xl mx-auto">
                <h1 className="text-[20px] md:text-2xl font-bold">Nosotros</h1>
                
                {/* Primera imagen - ancho completo con altura controlada */}
                <div className="w-full">
                    <img 
                        src="./assets/imgs/banner3.jpg" 
                        alt="Descripción de la imagen" 
                        className="w-full h-48 md:h-64 lg:h-72 object-cover rounded-lg shadow-md" 
                    />
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate totam at eveniet in similique error nulla qui commodi, neque quia aut repellat provident consectetur quidem modi dolores veniam? Excepturi, aperiam.
                </p>

                {/* Secciones con imágenes - responsive flex */}
                <div className="w-full space-y-8 md:space-y-12">
                    {/* Primera sección - imagen izquierda, texto derecha */}
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                        <div className="w-full md:w-1/2 flex-shrink-0">
                            <img 
                                src="./assets/imgs/banner3.jpg" 
                                alt="Descripción de la imagen"
                                className="w-full h-48 md:h-64 lg:h-72 object-cover rounded-lg shadow-md"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <p className="text-gray-700 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, sequi voluptatibus minus accusantium, fuga commodi deserunt quod libero quia beatae quis facere eum itaque debitis harum deleniti nam, natus voluptates!
                            </p>
                        </div>
                    </div>

                    {/* Segunda sección - texto izquierda, imagen derecha */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-8">
                        <div className="w-full md:w-1/2 flex-shrink-0">
                            <img 
                                src="./assets/imgs/banner3.jpg" 
                                alt="Descripción de la imagen"
                                className="w-full h-48 md:h-64 lg:h-72 object-cover rounded-lg shadow-md"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <p className="text-gray-700 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur pariatur culpa laboriosam commodi ratione delectus id, dolorum sequi sit facere optio fugiat amet ipsa nemo suscipit doloribus iusto itaque. Vel.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
            <Footer />
            </>
    )
}