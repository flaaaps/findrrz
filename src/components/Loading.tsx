import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    loading: boolean;
};

const Loading: React.FC<Props> = ({ loading }) => (
    <div className="loader">
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="overflow-hidden"
                    initial={{ translateX: 0 }}
                    animate={{ scale: 1, translateX: 0 }}
                    exit={{ translateY: 1000 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-gray-800 h-screen flex justify-center">
                        <motion.div
                            animate={{ scale: 1, opacity: 1 }}
                            initial={{ scale: 0.2, opacity: 0 }}
                            transition={{ duration: 0.25, delay: 1.5 }}
                        >
                            <div className="animation">
                                <div className="sk-cube-grid">
                                    <div className="sk-cube sk-cube1"></div>
                                    <div className="sk-cube sk-cube2"></div>
                                    <div className="sk-cube sk-cube3"></div>
                                    <div className="sk-cube sk-cube4"></div>
                                    <div className="sk-cube sk-cube5"></div>
                                    <div className="sk-cube sk-cube6"></div>
                                    <div className="sk-cube sk-cube7"></div>
                                    <div className="sk-cube sk-cube8"></div>
                                    <div className="sk-cube sk-cube9"></div>
                                </div>
                            </div>
                            {/* <h1 className="justify-self-end loading-text text-gray-200">Just a moment.</h1> */}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default Loading;
