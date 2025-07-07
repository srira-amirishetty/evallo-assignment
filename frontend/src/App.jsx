import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';

function App() {

  const [response,setResponse]= useState([])
  const [enteredTgGroup,setEnteredTgGroup] = useState("");
  const [showNameFilter,setShowNameFilter] = useState(false);
  const [nameorder,setNameOrder] = useState("")
  const [visibleGroups,setVisibleGroups] = useState([])
  const [showGenderFilter,setShowGenderFilter] = useState(false)
  const [gender,setGender] = useState("")
  const [showAgeGroupFilter,setShowAgeGroupFilter] = useState("");
  const [ageGroup,setageGroup] = useState("");
  const [showRegionFilter,setShowRegionFilter] = useState("");
  const [region,setRegion] = useState("");

  useEffect(()=>{handleRegister()},[])

   useEffect(() => {
    setVisibleGroups(response)
  },[response])

  // console.log(visibleGroups)
  
   const handleRegister = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000');
      setResponse(response.data)
      console.log(response)
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

   const handleNameSelect = (name) => {
    setShowNameFilter(false);
    setNameOrder(name)
  }

  const handleGenderSelect = (gender) => {
    setShowGenderFilter(false);
    setGender(gender)
  }

  const handleAgeGroupSelect = (agegroup) => {
    setShowAgeGroupFilter(false);
    setageGroup(agegroup)
  }

  const handleRegionSelect = (region) => {
    setShowRegionFilter(false);
    setRegion(region)
  }


useEffect(() => {
  if (!response || response.length === 0) return;

  let result = [...response];

  if (enteredTgGroup && enteredTgGroup.trim() !== "") {
    result = result.filter((item) =>
      item?.name?.toLowerCase().includes(enteredTgGroup.toLowerCase())
    );
  }

  if (gender && gender !== "Reset") {
    result = result.filter(
      (item) => item?.gender?.toLowerCase() === gender.toLowerCase()
    );
  }

  if (nameorder === "A-Z") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (nameorder === "Z-A") {
    result.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (ageGroup === "Low to High") {
    result.sort((a, b) => a.age - b.age);
  } else if (ageGroup === "High to Low") {
    result.sort((a, b) => b.age - a.age);
  }

  if (region === "A-Z") {
    result.sort((a, b) => a.region.localeCompare(b.region));
  } else if (region === "Z-A") {
    result.sort((a, b) => b.region.localeCompare(a.region));
  }

  setVisibleGroups(result);
}, [enteredTgGroup, gender, nameorder, ageGroup, region]);



  const handleCloseTgModel = () =>{
    setShowTargetGroupPopup(false)
    setShowAll(false)
  }

  const handleShowNameFilter = () => {
    setShowNameFilter(!showNameFilter)
    setShowGenderFilter(false)
    setShowAgeGroupFilter(false)
    setShowRegionFilter(false)
  }

  const handleShowGenderFilter = () => {
    setShowNameFilter(false)
    setShowGenderFilter(!showGenderFilter)
    setShowAgeGroupFilter(false)
    setShowRegionFilter(false)
  }

  const handleShowAgeGroupFilter = () => {
    setShowNameFilter(false)
    setShowGenderFilter(false)
    setShowAgeGroupFilter(!showAgeGroupFilter)
    setShowRegionFilter(false)
  }

  const handleShowRegionFilter = () => {
    setShowNameFilter(false)
    setShowGenderFilter(false)
    setShowAgeGroupFilter(false)
    setShowRegionFilter(!showRegionFilter)
  }


  return (
    <>
    <div className="bg-[#23145A] h-[100vh] ">
          <div className="flex justify-between">
            <div className="text-base font-bold text-[#FFFFFF]">
              {"Choose your Target Group"}
            </div>

            <div className="flex gap-1">
              
            </div>
          </div>
            <div className="border-[1px] border-[#8297BD] rounded-md w-[20vw] mt-2 pl-1 p-2 flex gap-5 justify-center items-center">
              <div className="pl-4">
              <svg  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7963 10.7963 13.3333 7.66667 13.3333C4.53705 13.3333 2 10.7963 2 7.66667C2 4.53705 4.53705 2 7.66667 2C10.7963 2 13.3333 4.53705 13.3333 7.66667Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </div>

            <input type="text" placeholder="Search your Target Group" onChange={e=>setEnteredTgGroup(e.target.value)} value={enteredTgGroup}
            className="placeholder-[#8297BD] text-white  w-full focus:outline-none focus:ring-0 focus:border-transparent
            " />

            </div>

          <div className=" overflow-auto mt-[14px] scrollable-container">
            <table className="w-full bg-[#23145A] overflow-hidden pb-4">
              <thead className="bg-[#091234] h-[44px] sticky top-0 z-10">
                <tr className="text-[#E9BD4E] bg-[#091234] text-[14px] leading-[18px]">
                  <th className="px-2 text-left pl-4"></th>
                  <th className="px-5 text-left">
                    <div className="flex gap-1 justify-start relative text-left">{"Target Group"} 

                  <div onClick={() => setShowNameFilter(handleShowNameFilter)} >
                  <svg className={`transition-transform duration-200 ${showNameFilter ? 'rotate-180' : ''}`} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 6L9 13.5L1.5 6L2.83125 4.66875L9 10.8375L15.1688 4.66875L16.5 6Z" fill="#E8EAED"/>
                  </svg>
                  </div>

                  {showNameFilter && 
                  <div className="absolute z-[1000] ml-32 mt-6 w-18 rounded-md text-[12px] shadow-lg bg-[#332270] text-white">
                    <div
                      className={`px-3 py-2 cursor-pointer rounded-t-md hover:bg-yellow hover:text-black border-b border-[#23145A] border-1 ${nameorder === "A-Z" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleNameSelect("A-Z")}
                    >
                      A-Z
                    </div>
                    <div
                      className={`px-3 py-2 rounded-b-md cursor-pointer hover:bg-yellow hover:text-black ${nameorder === "Z-A" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleNameSelect("Z-A")}
                    >
                      Z-A
                    </div>
                  </div>
                  }

                  </div>
                  </th>
                  <th  className="px-5 text-left">
    
                  <div className="flex gap-1 justify-start relative text-left">{"Gender"} 
                  <div onClick={() => setShowGenderFilter(handleShowGenderFilter)} >
                  <svg className={`transition-transform duration-200 ${showGenderFilter ? 'rotate-180' : ''}`} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 6L9 13.5L1.5 6L2.83125 4.66875L9 10.8375L15.1688 4.66875L16.5 6Z" fill="#E8EAED"/>
                  </svg>
                  </div>

                  {showGenderFilter && 
                  <div className="z-[1000] absolute ml-32 mt-6 w-18 text-[12px] rounded-md shadow-lg bg-[#332270] text-white">
                    <div
                      className={`px-3 py-2 cursor-pointer rounded-t-md hover:bg-yellow hover:text-black border-b border-[#23145A] border-1 ${gender === "Male" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleGenderSelect("Male")}
                    >
                      Male
                    </div>
                    <div
                      className={`px-4 py-2  cursor-pointer hover:bg-yellow hover:text-black border-b border-[#23145A] border-1 ${gender === "Female" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleGenderSelect("Female")}
                    >
                      Female
                    </div>
                    <div
                      className={`px-4 py-2 cursor-pointer hover:bg-yellow hover:text-black border-b border-[#23145A] border-1 ${gender === "All" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleGenderSelect("Other")}
                    >
                      Other
                    </div>
                    <div
                      className={`px-4 py-2 rounded-b-md cursor-pointer hover:bg-yellow hover:text-black ${gender === "Reset" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleGenderSelect("Reset")}
                    >
                      Reset
                    </div>
                  </div>
                  }

                  </div>
                  
                  </th>
                  {/* age group header */}
                  
                  <th className="px-5 text-left">

                  <div className="flex gap-1 justify-start relative text-left ">{"Age Group"} 
                  <div onClick={() => setShowAgeGroupFilter(handleShowAgeGroupFilter)} >
                  <svg className={`transition-transform duration-200 ${showAgeGroupFilter ? 'rotate-180' : ''}`} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 6L9 13.5L1.5 6L2.83125 4.66875L9 10.8375L15.1688 4.66875L16.5 6Z" fill="#E8EAED"/>
                  </svg>
                  </div>

                  {showAgeGroupFilter && 
                  <div className="z-[1000] absolute ml-40 mt-6 text-[12px] rounded-md shadow-lg bg-[#332270] text-white ">
                    <div
                      className={`px-3 py-2 cursor-pointer rounded-t-md whitespace-nowrap inline-block hover:bg-yellow hover:text-black border-b border-[#23145A] border-1 ${ageGroup === "Male" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleAgeGroupSelect("High to Low")}
                    >
                      High to Low
                    </div>
                    <div
                      className={`px-3 py-2 rounded-b-md cursor-pointer whitespace-nowrap inline-block hover:bg-yellow hover:text-black ${ageGroup === "Female" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleAgeGroupSelect("Low to High")}
                    >
                      Low to High
                    </div>
                  </div>
                  }
                  </div>

                  </th>
                  <th className="px-5 text-left">Language</th>
                  <th className="px-5 text-left">
                    
                  <div className="flex gap-1 justify-start relative text-left">{"Region"} 
                  <div onClick={() => setShowRegionFilter(handleShowRegionFilter)} >
                  <svg className={`transition-transform duration-200 ${showRegionFilter ? 'rotate-180' : ''}`} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 6L9 13.5L1.5 6L2.83125 4.66875L9 10.8375L15.1688 4.66875L16.5 6Z" fill="#E8EAED"/>
                  </svg>
                  </div>

                  {showRegionFilter && 
                  <div className="z-[1000] absolute ml-20 mt-6 w-18 text-[12px] rounded-md shadow-lg bg-[#332270] text-white ">
                    <div
                      className={`px-3 py-2 cursor-pointer rounded-t-md hover:bg-yellow hover:text-black border-b border-[#23145A] border-1 ${region === "A-Z" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleRegionSelect("A-Z")}
                    >
                      A-Z
                    </div>
                    <div
                      className={`px-3 py-2 rounded-b-md cursor-pointer hover:bg-yellow hover:text-black ${ageGroup === "Female" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleRegionSelect("Z-A")}
                    >
                      Z-A
                    </div>
                  </div>
                  }
                  </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleGroups?.length > 0 ? (
                      <>
                        {visibleGroups?.map((item,rowIndex) => {
                          // const isExpanded = expandedRows[item.id || rowIndex];
                          return (
                            <tr className={
                              `border-b border-solid border-[#503193] font-normal text-sm hover:bg-[#5E33FF] bg-[#23145A] text-white ` 
                            }
                             key={`data-${item?.id}` || rowIndex}
                            //  onClick={clickontargetgroup(item?.id,index)} 
                             >
                              <td className="px-2 py-4 pl-4">
                                <div className="relative group cursor-pointer">
                                  
                                  <div className="max-w-[200px] truncate font-semibold">
                                  

                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="relative group cursor-pointer">
                                  <p className="text-white font-normal text-[14px] absolute bg-[#1E1239] mt-[-25px] p-1 rounded-[10px] leading-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-fit">
                                    {item?.name}
                                  </p>
                                  <div className="max-w-[200px] truncate font-semibold">
                                  {item?.name}
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="relative group cursor-pointer">
                                  <p className="text-white font-normal text-[14px] absolute bg-[#1E1239] mt-[-25px] p-1 rounded-[10px] leading-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-fit">
                                    {item?.gender}
                                  </p>
                                  <div className="max-w-[200px] truncate font-semibold">
                                  {item?.gender}
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="relative group cursor-pointer">
                                  <p className="text-white font-normal text-[14px] absolute bg-[#1E1239] mt-[-25px] p-1 rounded-[10px] leading-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-fit">
                                    {item?.age}
                                  </p>
                                  <div className="max-w-[200px] truncate font-semibold">
                                   {item?.age}
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="relative group cursor-pointer">
                                  <p className="text-white font-normal text-[14px] absolute bg-[#1E1239] mt-[-25px] p-1 rounded-[10px] leading-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-fit">
                                    {item?.lang}
                                  </p>
                                  <div className="max-w-[200px] truncate font-semibold">
                                  {item?.language}
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="relative group cursor-pointer">
                                  <p className="text-white font-normal text-[14px] absolute bg-[#1E1239] mt-[-25px] p-1 rounded-[10px] leading-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-fit">
                                    {item?.region}
                                  </p>
                                  <div className="max-w-[200px] truncate font-semibold">
                                    {item?.region}
                                  </div>
                                </div>
                              </td>

                            </tr>
  
                          )
                        })}
                      </>
                    ) : (
                      <>
                        <tr className="bg-[#332270] text-white font-normal border-b-[1px] border-[#8297BD]">
                          <td colSpan={6} className="px-6 py-6 text-[18px] text-center">
                            No Rule Data Found!
                          </td>
                        </tr>
                      </>
                    )}
              </tbody>
            </table>
          </div>

          <div className="mx-auto text-center gap-5 flex justify-center pt-5">
            <div onClick={handleCloseTgModel} className="text-white border-2 px-5 py-2 rounded-full border-white w-[100px]">
              Back
            </div>
          </div>
          </div>
    </>
  )
}

export default App
