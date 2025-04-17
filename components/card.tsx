"use client";

import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";

import Link from "next/link";
import { HeartFilledIcon } from "./icons";

import { Meme } from "@/types";

type CardMemeProps = {
    data: Meme;
};

const CardMeme = ({ data }: CardMemeProps) => {
    const { name, likes, image } = data;

    const handleClick = () => {
        window.open(image, "_blank");
    };

    return (
        <li className="sm:h-full">
            <Card
                isPressable
                className="h-max w-full shadow-lg border-1 border-gray-400 hover:scale-105 duration-300"
                shadow="sm"
                onPress={handleClick}
            >
                <CardBody className="sm:w-full p-0">
                    <Image
                        alt={name}
                        className="object-cover h-[286px] sm:h-[365px] w-full"
                        loading="lazy"
                        radius="lg"
                        shadow="sm"
                        src={image}
                        width="100%"
                    />
                </CardBody>
                <CardFooter className="flex flex-col flex-1 justify-between bg-gray-100 p-2 sm:gap-2 sm:p-3">
                    <h3 className="text-black font-bold text-sm leading-tight line-clamp-2 h-[40px]">
                        {name}
                    </h3>

                    <div className="flex items-center gap-1">
                        <HeartFilledIcon className="text-red-700" />
                        <p className="text-default-500">{likes}</p>
                    </div>
                    <Link
                        className="text-blue-500 hover:underline text-sm"
                        href={image}
                        target="_blank"
                    >
                        View Meme
                    </Link>
                </CardFooter>
            </Card>
        </li>
    );
};

export default CardMeme;
