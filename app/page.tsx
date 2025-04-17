import Link from 'next/link';
import React from 'react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[75vh] bg-gray-100 text-center p-4">
            <h2 className="text-4xl font-semibold text-gray-800 mb-6">Welcome to our Memes App!</h2>
            <p className="text-lg text-gray-600 mb-10">You can watch and edit your favorite memes here.</p>
            <ul className="flex flex-col gap-4">
                <li>
                    <Link
                        className="text-lg text-blue-500 hover:bg-blue-500 hover:text-white border-2 border-blue-500 rounded-lg py-2 px-6 transition-all duration-300"
                        href="/table"
                    >
                        Go to Table View

                    </Link>
                </li>
                <li>
                    <Link
                        className="text-lg text-blue-500 hover:bg-blue-500 hover:text-white border-2 border-blue-500 rounded-lg py-2 px-6 transition-all duration-300"
                        href="/list"
                    >
                        Go to Cards View
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
