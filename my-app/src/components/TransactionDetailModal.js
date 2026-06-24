function TransactionDetailModal({

  transaction,
  details,
  onClose

}) {

  if (!transaction)
    return null;

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>

          📜 บิล #

          {transaction.id}

        </h2>

        <p>

          วันที่ :

          {" "}

          {transaction.created_at}

        </p>

        <hr />

        {

          details.map(
            (item,index) => (

            <div
              key={index}
            >

              <h4>

                {item.name}

              </h4>

              <p>

                จำนวน :

                {item.quantity}

              </p>

              <p>

                ราคา :

                {item.sell_price}

              </p>

              <p>

                รวม :

                {item.total}

              </p>

            </div>

          ))

        }

        <button
          onClick={onClose}
        >
          ปิด
        </button>

      </div>

    </div>

  );

}

export default
TransactionDetailModal;