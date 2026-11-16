import { useId, useState } from "react";

const collator = new Intl.Collator("en-IN", { numeric: true, sensitivity: "base" });

export default function AdminTable({ label, columns, rows, rowLabel, action, renderDetails, hasMore }) {
  const [sort, setSort] = useState(null);
  const column = columns.find(({ key }) => key === sort?.key);
  const sorted = column ? [...rows].sort((first, second) =>
    collator.compare(column.sort(first), column.sort(second)) * sort.direction) : rows;

  return (
    <div>
      <div className="table-scroll" tabIndex={0} role="region" aria-label={label}>
        <table className="admin-table">
          <caption className="sr-only">{label}</caption>
          <thead>
            <tr>
              {columns.map(({ key, heading, sort: sortValue, mobileHidden }) => (
                <th key={key} scope="col" className={mobileHidden ? "table-hidden-mobile" : undefined} aria-sort={sort?.key === key ? (sort.direction === 1 ? "ascending" : "descending") : undefined}>
                  {sortValue ? (
                    <button className="table-sort" type="button" onClick={() => setSort((previous) => ({
                      key, direction: previous?.key === key ? -previous.direction : 1,
                    }))}>
                      {heading}<span aria-hidden="true">{sort?.key === key ? (sort.direction === 1 ? "↑" : "↓") : "↕"}</span>
                    </button>
                  ) : heading}
                </th>
              ))}
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item) => (
              <ExpandableRow key={item.id} item={item} columns={columns} label={rowLabel(item)}
                action={action} renderDetails={renderDetails} />
            ))}
          </tbody>
        </table>
      </div>
      <p className="records-caption">{rows.length} {rows.length === 1 ? "record" : "records"} loaded.{hasMore && " Sorting applies to loaded records."}</p>
    </div>
  );
}

function ExpandableRow({ item, columns, label, action, renderDetails }) {
  const [expanded, setExpanded] = useState(null);
  const open = expanded === true;
  const detailsId = useId();

  return (
    <>
      <tr data-open={open}>
        {columns.map((column, index) => index === 0
          ? <th key={column.key} scope="row">{column.render(item)}</th>
          : <td key={column.key} className={column.mobileHidden ? "table-hidden-mobile" : undefined}>{column.render(item)}</td>)}
        <td>
          <button type="button" className="button secondary table-action" aria-expanded={open} aria-controls={detailsId}
            aria-label={`${open ? "Close" : action} ${label}`} onClick={() => setExpanded(!open)}>
            {open ? "Close" : action}
          </button>
        </td>
      </tr>
      <tr className="table-details" hidden={!open} id={detailsId}>
        <td colSpan={columns.length + 1}>{expanded !== null && renderDetails(item)}</td>
      </tr>
    </>
  );
}
