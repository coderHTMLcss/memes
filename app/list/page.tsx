"use client"

import React from "react";

import ListCards from "@/components/list-cards";
import { useFetch } from "@/hooks/useFetch";
import { Meme } from "@/types";
import { BASE_URL } from "@/constants";

export default function ListPage() {
    const [data, loading, error] = useFetch<Meme[]>(BASE_URL);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <ListCards memes={data ?? []} />;
};