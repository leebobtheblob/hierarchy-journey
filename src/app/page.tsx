import SimpleTree from './_components/simple-tree';
import { getHierarchy } from './_actions/tree-action';

export default async function Home() {
  const hierarchyData = await getHierarchy();
  console.log('server page : ', hierarchyData);

  return (
    <div className="p-20">
      {hierarchyData ? (
        <SimpleTree hierarchyData={hierarchyData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
