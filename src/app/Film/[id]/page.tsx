export default function Page({params} : {params : {id: number}}) {
    console.log(params)

    return (
        <div>{`Film id = ${params.id}`}</div>
    )
}