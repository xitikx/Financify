// import React from 'react';

// function Modal({
//   title,
//   categories,
//   formData,
//   setFormData,
//   onSave,
//   onClose,
// }) {
//   // Function to handle the changes in input fields
//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   if (!formData) {
//     return null;
//   }

//   const { category, amount } = formData;

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>{title}</h2>
        
//         <div>
//           <label>Category</label>
//           <select
//             value={category}
//             onChange={(e) => handleChange('category', e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>{category}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Amount</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => handleChange('amount', e.target.value)}
//           />
//         </div>

//         {/* Dynamic input fields for other data */}
//         {Object.keys(formData)
//           .filter((key) => !['category', 'amount'].includes(key))
//           .map((field, index) => (
//             <div key={index}>
//               <label>{field}</label>
//               <input
//                 type="text"
//                 value={formData[field] || ''}
//                 onChange={(e) => handleChange(field, e.target.value)}
//               />
//             </div>
//           ))}

//         <div className="modal-buttons">
//           <button onClick={onSave} className="save-button">Save</button>
//           <button onClick={onClose} className="cancel-button">Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Modal;


// import React from 'react';

// function Modal({
//   title,
//   categories,
//   formData,
//   setFormData,
//   onSave,
//   onClose,
// }) {
//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   if (!formData) {
//     return null;
//   }

//   const { category, amount } = formData;

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>{title}</h2>

//         {category === 'Income' ? (
//           <div>
//             <label>Amount</label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => handleChange('amount', e.target.value)}
//             />
//           </div>
//         ) : (
//           <>
//             <div>
//               <label>Category</label>
//               <select
//                 value={category}
//                 onChange={(e) => handleChange('category', e.target.value)}
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((category, index) => (
//                   <option key={index} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label>Amount</label>
//               <input
//                 type="number"
//                 value={amount}
//                 onChange={(e) => handleChange('amount', e.target.value)}
//               />
//             </div>
//           </>
//         )}

//         <div className="modal-buttons">
//           <button onClick={onSave} className="save-button">Save</button>
//           <button onClick={onClose} className="cancel-button">Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Modal;


import React from 'react';

function Modal({ title, categories, formData, setFormData, onSave, onClose }) {
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <div>
          <label>Category</label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={onSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
