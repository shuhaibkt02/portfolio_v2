"use client";

import { motion } from "framer-motion";

type TechStackGalleryProps = {
    techStack: string[];
    galleryImages: string[];
};

export const TechStackGallery = ({ techStack, galleryImages }: TechStackGalleryProps) => {
    return (
        <section className="bg-zinc-950 py-24 text-white">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">

                {/* Tech Stack */}
                <div className="mb-24 text-center">
                    <h2 className="mb-8 text-2xl font-bold font-heading">Technologies Used</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {techStack.map((tech, i) => (
                            <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="rounded-full border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-flutter-blue hover:text-white transition-colors cursor-default"
                            >
                                {tech}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Gallery */}
                <div>
                    <h2 className="mb-12 text-center text-3xl font-bold font-heading">Project Gallery</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {galleryImages.map((image, i) => (
                            <motion.div
                                key={image}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 group h-64 ${i === 0 || i === 3 ? "md:col-span-2" : ""}`}
                            >
                                {/* Replacing placeholder text with actual image tag later, but for now just showing path or placeholder text if image invalid */}
                                <div className="absolute inset-0 flex items-center justify-center text-zinc-600 group-hover:bg-zinc-800 transition-colors">
                                    {/* 
                                      In a real scenario, use <Image src={image} ... /> 
                                      For now, since the paths are placeholders like /projects/waves/screen-1.jpg which might not exist,
                                      I will keep the text, but try to render it as an image if it was real.
                                      I'll keep it as text/placeholder box for now to avoid broken image icons.
                                    */}
                                    <span className="px-4 text-center break-all">{image}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
