import React from 'react'
import CardMeme from './card'
import { Meme } from '@/types'

const ListCards = ({ memes }: { memes: Meme[] }) => {
    return (
        <ul className="gap-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
            {memes.map((meme) => (
                <CardMeme
                    key={meme.id}
                    data={meme}
                />
            ))}
        </ul>
    );
};

export default ListCards;
