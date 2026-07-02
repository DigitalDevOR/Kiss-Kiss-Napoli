import { getWebRadioList } from "@/lib/wp";
import WebRadioSlider from "./WebRadioSlider";

export default async function WebRadioList() {

    const radios = await getWebRadioList();
   
    return (
        <WebRadioSlider radios={radios} />
    )

}