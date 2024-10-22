import { useState, useEffect } from "react";
import { InfoBar } from '../components/pad'
import { EndPoint } from '../util/endpoint';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

interface Prop {
  _id: string,
  eventType: string,
  from: string,
  fromName: string,
  transaction_hash: string, to: string, toName: string,
  amount: number,
  time: number
}


const History = () => {
  const [data, setData] = useState<Prop[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${EndPoint}/logs`);
      setData(response.data)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const sortedData = data?.filter(info =>
    info.fromName.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.fromName.localeCompare(b.fromName));

  return (
    <main>
      <section className="h-[14vh] mb-8">
        <img
          src="main.jpg"
          alt="Top Image"
          className="w-[100vw] h-60"
        />
      </section>
      <section className="px-8 py-4 mb-12">
        <div className="w-[100%] flex items-center justify-center">
          <input
            type="text"
            placeholder="Search by fromName"
            value={searchTerm}
            onChange={handleInputChange}
            className="border border-[#FF8C00] p-3 mb-4 rounded-lg w-[80%]"
          />
        </div>
        <div className="mt-12">
          {sortedData?.map((info) => {
            return (
              <InfoBar {...info}></InfoBar>
            )
          })}
        </div>
      </section>
    </main>
  );
};

export default History;
