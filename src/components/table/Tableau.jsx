"use client"
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
} from "@nextui-org/react";
import { Plus } from "./../../components/icons/Plus";
import { VerticalDotsIcon } from "./../../components/icons/VerticalDotsIcon";
import { SearchIcon } from "./../../components/icons/SearchIcon";
import { Chevron } from "./../../components/icons/Chevron";
import { statusOptions } from "./data";
import { capitalize } from "./../../app/utils/helper";

const statusColorMap = {
  Actif: "success",
  Bloqué: "danger"
};

// const INITIAL_VISIBLE_COLUMNS =["id","dt", "nomEntite", "libelleCaisse", "actions"];

export default function App({ columns, showStatus, INITIAL_VISIBLE_COLUMNS,color, datas, nbOfRows, cellule, coloneSearch, handleBtnNouveau, btnnouveauText, hideBtnNouveau, hideSearchColone }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(nbOfRows || 5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(datas?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filtereddatas = [...datas];

    if (hasSearchFilter) {
      filtereddatas = filtereddatas.filter((user) =>
        user[coloneSearch].toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filtereddatas = filtereddatas.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filtereddatas;
  }, [datas, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);



  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);


  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          {hideSearchColone && 
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Recherche..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          }
          <div className="flex gap-3">
            {showStatus !== false &&
              <Dropdown>
                <DropdownTrigger className=" sm:flex">
                  <Button
                    endContent={<Chevron className="text-small" />}
                    size="sm"
                    variant="flat"
                  >
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            }
            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button
                  endContent={<Chevron className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Colones visibles
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {(!hideBtnNouveau || hideBtnNouveau === false) &&
              <Button
                color={"primary"}
                className=" text-background"
                endContent={<Plus />}
                size="sm"
                onPress={handleBtnNouveau}
              >
                {btnnouveauText || "Nouveau"}
              </Button>
            }
          </div>

        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {datas.length} Enregistrements</span>
          <label className="flex items-center text-default-400 text-small">
            Lignes par page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    datas.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: " text-background",
          }}
          color="primary"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} sur ${items.length} sectionnés`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "w-full", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <div className="bg-white px-9 py-4 rounded-md">
      <Table
        color={"success"}
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        border={true}
        //   checkboxesProps={{
        //     classNames: {
        //       wrapper: "w-full after:bg-foreground after:text-background text-background",
        //     },
        //   }}

        selectedKeys={selectedKeys}
        selectionMode="single"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              <div className="text-center items-center justify-center">{column.name}</div>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Aucne donnée trouvée"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{cellule(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
