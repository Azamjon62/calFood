function Main() {
  return (
    <div>
        <div className="container">
            <table className=" border-black border-[1px]">
                <thead className="border-black border-[1px]" >
                <tr className="">
                    <th className=" w-[320px] border-black border-[1px]" >Person</th>
                    <th className=" w-[200px] mr-[10px] border-black border-[1px]" >Food</th>
                    <th className="w-[20%] border-black border-[1px]" >Price</th>
                </tr>
                </thead>
                <tbody className="border-black border-[1px]" >
                    <tr className="border-black border-[1px]" >
                        <td className="border-black border-[1px]">A'zamjon</td>
                        <td className="border-black border-[1px]">osh</td>
                        <td className="border-black border-[1px]">15 000</td>
                    </tr>
                    <tr className="border-black border-[1px]" >
                        <td className="border-black border-[1px]">Jahongir</td>
                        <td className="border-black border-[1px]">osh</td>
                        <td className="border-black border-[1px]">20 000</td>
                    </tr>
                    <tr className="border-black border-[1px]" >
                        <td className="border-black border-[1px]">Ayubhon</td>
                        <td className="border-black border-[1px]">osh</td>
                        <td className="border-black border-[1px]">20 000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default Main;
