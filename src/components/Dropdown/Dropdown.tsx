import React, { ChangeEvent, Dispatch, Fragment, SetStateAction } from "react"
import { SceneProps, SceneImages } from "../../App.interface"

const Dropdown = ({
  data,
  setImg,
}: {
  data: SceneProps
  setImg: Dispatch<SetStateAction<{ src: string; srcSet: string }>>
}): JSX.Element => {
  const imgsArray = data && Object.values(data?.sceneImages)
  const dataIsNotEmpty = Array.isArray(imgsArray) && imgsArray.length > 0
  const updateImgUrl = (obj: false | SceneImages | undefined) => {
    if (!obj) return
    setImg({
      src: obj.image.responsiveImage.src,
      srcSet: obj.image.responsiveImage.srcSet,
    })
    return obj
  }
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const findImgObj = imgsArray.find((item) => item.image.id === value)
    updateImgUrl(findImgObj)
  }
  return (
    <div className="bg-white basis-1/4 rounded-tl-md rounded-bl-md pt-12 pl-5 pr-5">
      <form>
        <select
          data-testid="image-select"
          className="w-3/4 border-2 border-solid rounded-md border-gray-300"
          onChange={handleChange}
        >
          <option value="" hidden>
            Please select an image
          </option>
          {dataIsNotEmpty &&
            imgsArray.map((scene) => {
              return (
                <Fragment key={scene.image.id}>
                  <option
                    key={`${scene.lensType}-${scene.lensColour}`}
                    value={scene.image.id}
                    data-testid="select-option"
                  >
                    {`${scene.lensType} ${scene.lensColour}`}
                  </option>
                </Fragment>
              )
            })}
        </select>
      </form>
    </div>
  )
}

export default Dropdown
