export function getHierachyAttractionTypes(attractionTypeList: any) {
  let parents = attractionTypeList.filter((item: any, index: any) => item.parentId === null)

  let childrens = attractionTypeList.filter((item: any, index: any) => item.parentId)

  parents.forEach((parent: any) => {
    let children = childrens.filter((child: any, index: any) => child.parentId._id === parent._id)
    parent.children = children
  })

  return parents
}
