import { useEffect, useState } from "react";
import axios from "axios";

import { SalePage } from "components/types/sale";
import {Pagination} from "components/Pagination";
import { BASE_URL } from "utils/requests";
import { formatLocalDate } from "utils/format";

export function DataTable() {
  const [page, setPage] = useState<SalePage>({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });
  const[activePage, setActivePage] = useState(0);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/sales?page=${activePage}&size=20&sort=date,desc`)
      .then((response) => {
        setPage(response.data);
      });
  }, [activePage]);

  function changePage(index:number){
    setActivePage(index)
  }

  return (
    <>
    <Pagination page={page} onPageChange={changePage}/>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Data</th>
              <th>Vendedor</th>
              <th>Clientes visitados</th>
              <th>Negócios fechados</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {page.content?.map((sale) => {
              return (
                <tr key={sale.id}>
                  <td>{formatLocalDate(sale.date, "dd/MM/yyyy")}</td>
                  <td>{sale.seller.name}</td>
                  <td>{sale.visited}</td>
                  <td>{sale.deals}</td>
                  <td>{sale.amount.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
