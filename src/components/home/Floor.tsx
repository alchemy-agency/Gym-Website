import { FloorPan } from "@/components/gsap/FloorPan";
import { ParallaxPlate } from "@/components/ParallaxPlate";
import { facilityList } from "@/content/offers";
import { photos } from "@/content/photos";

/**
 * THE FLOOR
 * A full-bleed parallax band gives the reader a breath with no copy on it at
 * all, then the equipment pans horizontally past a fixed intro column. The pan
 * is scroll-hijacked GSAP and only exists above 1024px; below that the same
 * markup reads as a stacked list.
 */
export function Floor() {
  return (
    <>
      <div className="border-t border-line">
        <ParallaxPlate
          photo={photos.conditioning}
          sizes="100vw"
          travel={10}
          className="h-[46vh] min-h-[300px] w-full lg:h-[56vh]"
        />
      </div>

      <FloorPan
        groups={facilityList}
        eyebrow="Inside the shop"
        heading="The floor is the argument."
        body="Everything here is chosen so a serious programme is possible without waiting for a machine or working around someone else's circuit."
      />
    </>
  );
}
