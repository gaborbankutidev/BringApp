import React from "react"
import { useGetListData } from "./hooks/use-get-list-data"

export const ListPage = () => {
    const { data, isPending, isError } = useGetListData()

    return (
        <>
            {isPending && <p>Loading...</p>}
            {isError && <p>Error</p>}
            {data &&
                data.map((item) => (
                    <a
                        key={item.id}
                        href={`/wp-admin/admin.php?page=post-read-page&id=${item.id}`}
                    >
                        <div
                            style={{
                                border: "1px solid black",
                                padding: "10px",
                                marginBottom: "10px",
                            }}
                        >
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                        </div>
                    </a>
                ))}
        </>
    )
}
