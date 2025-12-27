const Skeleton = () => {
  return (
    <>
      <div className="flex h-96 flex-col gap-4">
        <div className="skeleton h-full w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </>
  )
}
export default Skeleton
