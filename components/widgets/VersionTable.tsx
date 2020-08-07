function ReleaseTable() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-4 row-gap-8">
      <div>
        <h4 className="font-bold text-gray-400">24 releases:</h4>
        <table className="border-collapse">
          <tbody>
            <tr>
              <th className="pr-2 text-right font-medium">1.12.2</th>
              <td className="justify text-gray-500">x, nest</td>
            </tr>
            <tr>
              <th className="pr-2 text-right font-medium">1.12.1</th>
              <td className="justify text-gray-500">x</td>
            </tr>
            <tr>
              <th className="pr-2 text-right font-medium">1.12.0</th>
              <td className="justify text-gray-500">x</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReleaseTable;
