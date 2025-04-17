import React from 'react';

import { Link } from '@heroui/link';
import { GithubIcon } from "@/components/icons";


const Footer = () => {
    return (
        <footer className="w-full flex items-center justify-center py-3 border-t-1">
            <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://github.com/coderHTMLcss"
                title="coderHTMLcss"
            >
                <GithubIcon size={50} />
                <div className="hidden sm:flex items-center leading-none gap-2">
                    <p className="text-default-600 text-sm">
                        Visit my GitHub Repository
                    </p>
                    <p className="text-primary text-lg">coderHTMLcss</p>
                </div>
            </Link>
        </footer>
    );
};

export default Footer;
