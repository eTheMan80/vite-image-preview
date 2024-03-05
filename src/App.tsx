import React, { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"
import { ValidationError, SceneProps } from "./App.interface"
import Dropdown from "./components/Dropdown"
import SceneImage from "./components/SceneImage"

export default function App() {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [scene, setScene] = useState<SceneProps[]>([])
  const [img, setImg] = useState<{ src: string; srcSet: string }>({
    src: "",
    srcSet: "",
  })
  const [imgIndex, setImgIndex] = useState<number>(0)
  const sceneImageToDisplay = scene && scene[imgIndex]

  useEffect(() => {
    const sceneClient = axios.create({
      baseURL:
        "https://gist.githubusercontent.com/robwatkiss/09f2461e02d372747dad5fe56ff2251f/raw/b942d9ba21e10889a6cfce639c1a12f6bb2bfa0e/Senior%2520Frontend%2520Developer%2520Task%2520-%2520Sample%2520Lens%2520Guide%2520Data.json",
    })

    async function fetchClientData() {
      try {
        const res = await sceneClient.get("")
        setScene(res.data)
        setImg({
          src: res.data[0].nakedEyeImage.responsiveImage.src as string,
          srcSet: res.data[0].nakedEyeImage.responsiveImage.srcSet as string,
        })
      } catch (err) {
        const error = err as ValidationError
        console.log(error.message)
        setHasError(true)
      } finally {
        setHasLoaded(true)
      }
    }
    fetchClientData()
  }, [])

  if (!hasLoaded) {
    return (
      <div
        data-testid="loading"
        className="w-screen h-screen flex flex-col justify-center items-center text-center text-3xl"
      >
        Please wait while we load your information.
      </div>
    )
  }

  if (hasError) {
    return (
      <div
        data-testid="error"
        className="w-screen h-screen flex flex-col justify-center items-center text-center text-3xl"
      >
        <span>
          We haven&lsquo;t been able to load your information at this time.
        </span>
        <span>Please contact customer support to assist with this issue.</span>
      </div>
    )
  }
  return (
    <div className="App pt-5 pb-5">
      <div className="wrapper flex flex-row justify-center columns-2 overflow-hidden h-screen">
        <Dropdown data={sceneImageToDisplay} setImg={setImg} />
        <SceneImage
          data={scene}
          setImg={setImg}
          img={img}
          setImgIndex={setImgIndex}
        />
      </div>
    </div>
  )
}
