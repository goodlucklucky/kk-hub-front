import DynamicPlayScreen from "./DynamicPlayScreen";

export default async function Page(props: any) {
  const params = await props?.params;
  const title = params?.title;

  return <DynamicPlayScreen title={title} />;
}
