import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import AddModal from "./AddModal";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

export default function CabinTable() {
  const { cabins, isLoading, error } = useCabin();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("discount") || "all";
  if (isLoading) return <Spinner />;
  /////////////////////////////////////////////
  let filterCabin;
  if (filter === "all") filterCabin = cabins;
  if (filter === "nodiscount")
    filterCabin = cabins.filter((cabin) => cabin.discount === 0);
  if (filter === "discount")
    filterCabin = cabins.filter((cabin) => cabin.discount > 0);
  console.log(filterCabin);
  //////////////////////////////////////////////

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, order] = sortBy.split("-");
  const orderDetector = order === "asc" ? 1 : -1;
  const sortAndFliter = filterCabin.sort(
    (a, b) => (a[field] - b[field]) * orderDetector
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <AddModal />
        </Table.Header>
        <Table.Body
          pick="cabins"
          data={sortAndFliter}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
        <Table.Footer>
          <Pagination resualtNum={30} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
