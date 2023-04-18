import { Customer } from 'src/models/customer.model';
import { Email } from 'src/models/email.model';
import { OrderModel } from 'src/models/order.model';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';

export const getAdminEmail = (task: TaskModel) => {
  const fsr = task.Fsr;
  let email = `


    <table border=1 style='width:100%; border-collapse: collapse;'>
    
     
        <tr>
            <td style='padding:10px;line-height: 15px;; font-weight:700'>Work Done:</td>
            <td style='padding:10px;line-height: 15px;;line-height: 15px;' colspan=2>${
              fsr.WorkDone
            }</td>
        </tr>
        <tr>
            <td style='padding:10px;line-height: 0; font-weight:800' colspan=3>
             <h3 style='padding:0;margin:4px 0;margin-top:10px;'>Parts  used</h3>
            </td>
        </tr>
     
        <tr>
            <td style='padding:10px;line-height: 15px;; font-weight:700'>Qty</td>
            <td style='padding:10px;line-height: 15px;; font-weight:700'>Part Type</td>
            <td style='padding:10px;line-height: 15px;; font-weight:700'>Part Name</td>
        </tr>
    ${fsr.PartsUsed?.map(
      (x) =>
        `<tr>
            <td style='padding:10px;line-height: 15px;'>${x.Quantity}</td>
            <td style='padding:10px;line-height: 15px;'>${x.Type}</td>
            <td style='padding:10px;line-height: 15px;'>${x.Name}</td>
        </tr>`
    ).join('')}



${fsr.Consumables?.map(
  (x) =>
    `<tr>
        <td style='padding:10px;line-height: 15px;' colspan=2><b>${x.Name}</b></td>
        <td style='padding:10px;line-height: 15px;'>R${x.Price}</td>
    </tr>`
).join('')}

${fsr.Labour?.map(
  (x) =>
    `<tr>
      <td style='padding:10px;line-height: 15px;' colspan=2><b>${x.Name}</b></td>
      <td style='padding:10px;line-height: 15px;'>${x.Hours}</td>
      </tr>`
).join('')}

  <tr>
  <td style='padding:10px;line-height: 0; font-weight:800' colspan=3>
   <h3 style='padding:0;margin:4px 0;margin-top:15px;'>Task Info</h3>
  </td>
</tr>

<tr>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Task</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Distance</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Reference</td>
</tr>

<tr>
<td style='padding:10px'>${task.Name}</td>
<td style='padding:10px'>${fsr.DistanceTravelled}</td>
<td style='padding:10px'>${fsr.Reference}</td>
</tr>


<tr>
<td style='padding:10px;line-height: 0; font-weight:800' colspan=3>
 <h3 style='padding:0;margin:4px 0;margin-top:15px;'>Customer : ${
   task.Customer?.Name || '----'
 }</h3>
</td>
</tr>

<tr>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Contact person</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Phone No</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Email</td>
</tr>

<tr>
<td style='padding:10px'>${task.Customer?.Surname || '----'}</td>
<td style='padding:10px'>${task.Customer?.PhoneNumber || '----'}</td>
<td style='padding:10px'>${task.Customer?.Email || '----'}</td>
</tr>

<tr>
<td style='padding:10px;line-height: 0; font-weight:800' colspan=3>
 <h3 style='padding:0;margin:4px 0;margin-top:15px;'>Compressor Info</h3>
</td>
</tr>

<tr>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Model</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Serial</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Hours</td>
</tr>

<tr>
<td style='padding:10px'>${task.Machine?.Model || '----'}</td>
<td style='padding:10px'>${task.Machine?.Serial || '----'}</td>
<td style='padding:10px'>${task.Machine?.Hours || '----'}</td>
</tr>


<tr>
<td style='padding:10px;line-height: 0; font-weight:800' colspan=3>
 <h3 style='padding:0;margin:4px 0;margin-top:15px;'>Signitures</h3>
</td>
</tr>

<tr>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Customer</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Technician</td>
</tr>

<tr>
<img src="${fsr.CustomerSigniture}" style="width:12em" alt="">
<td style='padding:10px'>
<img src="${fsr.TechnicainSigniture}" style="width:12em" alt="">
</td>
</tr>
</table>

    `;
  return email;
};
export const getAdminQouteEmail = (task: TaskModel) => {
  const fsr = task.Fsr;
  let email = `
  
  <h2> Work done</h2>
  <table border=1 style='width:100%; border-collapse: collapse;'>
      <tr>
          <td style='padding:10px'>${fsr.WorkDone || '----'}</td>
      </tr>
  </table>

    <h2>Parts used</h2>
    <table border=1 style='width:100%; border-collapse: collapse;'>
        <tr>
        <td style='padding:10px; font-weight:700'>Qty</td>
        <td style='padding:10px; font-weight:700'>Part Type</td>
        <td style='padding:10px; font-weight:700'>Part Name</td>
        </tr>
    ${fsr.PartsUsed?.map(
      (x) =>
        `<tr>
            <td style='padding:10px'>${x.Quantity}</td>
            <td style='padding:10px'>${x.Type}</td>
            <td style='padding:10px'>${x.Name}</td>
        </tr>`
    ).join('')}
    </table>


    <h2>Consumables</h2>
    <table border=1 style='width:100%; border-collapse: collapse;'>
        <tr>
        <td style='padding:10px; font-weight:700'>Name</td>
        <td style='padding:10px; font-weight:700'>Price</td>
        </tr>
    ${fsr.Consumables?.map(
      (x) =>
        `<tr>
            <td style='padding:10px'>${x.Name}</td>
            <td style='padding:10px'>${x.Price}</td>
        </tr>`
    ).join('')}
    </table>


    <h2>Labour</h2>
    <table border=1 style='width:100%; border-collapse: collapse;'>
        <tr>
        <td style='padding:10px; font-weight:700'>Name</td>
        <td style='padding:10px; font-weight:700'>Hours</td>
        </tr>
    ${fsr.Labour?.map(
      (x) =>
        `<tr>
            <td style='padding:10px'>${x.Name}</td>
            <td style='padding:10px'>${x.Hours}</td>
        </tr>`
    ).join('')}
    </table>


    <h2>Other Info</h2>
    <table border=1 style='width:100%; border-collapse: collapse;'>
    
        <tr>
            <td style='padding:10px; font-weight:700'>Reference</td>
            <td style='padding:10px'>${fsr.Reference}</td>
        </tr>
        <tr>
            <td style='padding:10px; font-weight:700'> Customer Name</td>
            <td style='padding:10px'>${task.Customer?.Name || '----'}</td>
        </tr>
        <tr>
            <td style='padding:10px; font-weight:700'> Contact person</td>
            <td style='padding:10px'>${task.Customer?.Surname || '----'}</td>
        </tr>
        <tr>
            <td style='padding:10px; font-weight:700'>Phone No</td>
            <td style='padding:10px'>${
              task.Customer?.PhoneNumber || '----'
            }</td>
        </tr>
        <tr>
            <td style='padding:10px; task-weight:700'> Email address</td>
            <td style='padding:10px'>${task.Customer?.Email || '----'}</td>
        </tr>
        <tr>
            <td style='padding:10px; font-weight:700'>Customer address</td>
            <td style='padding:10px'>${
              task.Customer?.AddressLineHome || '----'
            }</td>
        </tr>
        <tr>
            <td style='padding:10px; font-weight:700'>Technicain Name</td>
            <td style='padding:10px'>${fsr.TechnicainName || '----'}</td>
        </tr>
    </table>



    
    <h2>Compressor details</h2>
    <table border=1 style='width:100%; border-collapse: collapse;'>
        <tr>
            <td style='padding:10px; font-weight:700'>Model</td>
            <td style='padding:10px'>${task.Machine?.Model || '----'}</td>
        </tr>
        <tr>
            <td style='padding:10px; font-weight:700'>Serial</td>
            <td style='padding:10px'>${task.Machine?.Serial || '----'}</td>
        </tr>
        <tr>
            <td style='padding:10px; font-weight:700'>Hours</td>
            <td style='padding:10px'>${task.Machine?.Hours || '----'}</td>
        </tr>
    </table>


    `;
  return email;
};

export const sendEmailToCustomer = (task: TaskModel) => {
  const fsr = task.Fsr;
  let email = `
<p style="  line-height:15px;">
Good day <br>

We appreciate your business and thank you for the <br>
 opportunity to be of service to you.  <br>
Below is the summary of the Field Service Report:
</p>  <br>

<table border=1 style='width:100%; border-collapse: collapse;'>
    
     
<tr>
    <td style='padding:10px;line-height: 15px;; font-weight:700'>Work Done:</td>
    <td style='padding:10px;line-height: 15px;;line-height: 15px;' colspan=2>${
      fsr.WorkDone
    }</td>
</tr>


<tr>
<td style='padding:10px;line-height: 0; font-weight:800' colspan=3>
<h3 style='padding:0;margin:4px 0;margin-top:15px;'>Compressor Info</h3>
</td>
</tr>

<tr>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Model</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Serial</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Hours</td>
</tr>

<tr>
<td style='padding:10px'>${task.Machine?.Model || '----'}</td>
<td style='padding:10px'>${task.Machine?.Serial || '----'}</td>
<td style='padding:10px'>${task.Machine?.Hours || '----'}</td>
</tr>


<tr>
<td style='padding:10px;line-height: 0; font-weight:800' colspan=3>
<h3 style='padding:0;margin:4px 0;margin-top:15px;'>Signitures</h3>
</td>
</tr>

<tr>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Customer</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Technician</td>
</tr>

<tr>
<img src="${fsr.CustomerSigniture}" style="width:12em" alt="">
<td style='padding:10px'>
<img src="${fsr.TechnicainSigniture}" style="width:12em" alt="">
</td>
</tr>
</table>
    <p style='padding:10px 0;line-height: 10px;'>
    Regards <br />
    G trent compressors <br />
    info@trentcompressors.com <br />
    </p>
    <img
    src="https://gtrentapp.tybo.co.za/assets/images/logo.png"
      style="width: 4rem; margin-top: 0; margin-bottom: 1rem;"
      alt=""
    />
      `;
  return email;
};

export const formatEmail = (
  email: Email,
  showRegards = false,
  logoUrl = 'https://gtrentapp.tybo.co.za/assets/images/logo.png'
) => `
  
  <div style="padding: 1rem">
   
    <div   style="
    white-space: pre-wrap;
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    max-width: 36rem;
    padding: 1rem;
    line-height:0;
    ">
   
      ${email.Message}
  
  
    </div>
  </div>
  
  `;

export const appendMoreEmailInfo = (user: User, task: TaskModel): string => {
  let fullMessage = '';
  fullMessage += `
    <span
    style="
      display: block;
      line-height: 18px;
      padding: 1rem;
      border: 1px dotted black;
      border-radius: 0.4rem;
    "
  >
    <b>Test results</b> <br />
    <span style="color: rgb(29, 105, 1)"> ${task.Fsr.WorkDone}</span>
  </span>
  
  <b>Customer:</b> ${task.Customer?.Name}<br>
  <b>Assigned to:</b> ${user.Name} <br>
  <b>Task Status:</b> ${task.Status} <br>
    `;
  return fullMessage;
};

export const getQouteEmail = (task: TaskModel, user: User) => {
  const fsr = task.Fsr;
  let email = `


  <table border=1 style='width:100%; border-collapse: collapse;'>
  
   
      <tr>
          <td style='padding:10px;line-height: 15px;; font-weight:700'>Work To Be Done:</td>
          <td style='padding:10px;line-height: 15px;;line-height: 15px;' colspan=2>${
            fsr.WorkDone
          }</td>
      </tr>
      <tr>
          <td style='padding:10px;line-height: 0; font-weight:800' colspan=3>
           <h3 style='padding:0;margin:4px 0;margin-top:10px;'>Parts  used</h3>
          </td>
      </tr>
   
      <tr>
          <td style='padding:10px;line-height: 15px;; font-weight:700'>Qty</td>
          <td style='padding:10px;line-height: 15px;; font-weight:700'>Part Type</td>
          <td style='padding:10px;line-height: 15px;; font-weight:700'>Part Name</td>
      </tr>
  ${fsr.PartsUsed?.map(
    (x) =>
      `<tr>
          <td style='padding:10px;line-height: 15px;'>${x.Quantity}</td>
          <td style='padding:10px;line-height: 15px;'>${x.Type}</td>
          <td style='padding:10px;line-height: 15px;'>${x.Name}</td>
      </tr>`
  ).join('')}



${fsr.Consumables?.map(
  (x) =>
    `<tr>
      <td style='padding:10px;line-height: 15px;' colspan=2><b>${x.Name}</b></td>
      <td style='padding:10px;line-height: 15px;'>R${x.Price}</td>
  </tr>`
).join('')}

${fsr.Labour?.map(
  (x) =>
    `<tr>
    <td style='padding:10px;line-height: 15px;' colspan=2><b>${x.Name}</b></td>
    <td style='padding:10px;line-height: 15px;'>${x.Hours}</td>
    </tr>`
).join('')}

<tr>
<td style='padding:10px;line-height: 0; font-weight:800' colspan=3>
 <h3 style='padding:0;margin:4px 0;margin-top:15px;'>Quote  Info</h3>
</td>
</tr>

<tr>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Quote </td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Distance</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Reference</td>
</tr>

<tr>
<td style='padding:10px'>${task.Name}</td>
<td style='padding:10px'>${fsr.DistanceTravelled}</td>
<td style='padding:10px'>${fsr.Reference}</td>
</tr>


<tr>
<td style='padding:10px;line-height: 0; font-weight:800' colspan=3>
<h3 style='padding:0;margin:4px 0;margin-top:15px;'>Customer : ${
    task.Customer?.Name || '----'
  }</h3>
</td>
</tr>

<tr>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Contact person</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Phone No</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Email</td>
</tr>

<tr>
<td style='padding:10px'>${task.Customer?.Surname || '----'}</td>
<td style='padding:10px'>${task.Customer?.PhoneNumber || '----'}</td>
<td style='padding:10px'>${task.Customer?.Email || '----'}</td>
</tr>

<tr>
<td style='padding:10px;line-height: 0; font-weight:800' colspan=3>
<h3 style='padding:0;margin:4px 0;margin-top:15px;'>Compressor Info</h3>
</td>
</tr>

<tr>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Model</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Serial</td>
<td style='padding:10px;line-height: 15px;; font-weight:700'>Hours</td>
</tr>

<tr>
<td style='padding:10px'>${task.Machine?.Model || '----'}</td>
<td style='padding:10px'>${task.Machine?.Serial || '----'}</td>
<td style='padding:10px'>${task.Machine?.Hours || '----'}</td>
</tr>

<tr>
<td style='padding:10px;line-height: 0; font-weight:800' colspan=3>

<p style="line-height: 6px">
<br />
<br />
​Kindly Regards
<br />
<br />
${user.Name} <br />
<b>C</b>: ${user.PhoneNumber || '--- ---- ---'} <br />
<b>E</b>: ${user.Email}
</p>
</td>
</tr>

</table>

  `;
  return email;
};

export const getConfirmationEmail = (
  task: TaskModel,
  user: User,
  customer: Customer
) => {
  let email = `


  <table border=1 style='width:100%; border-collapse: collapse;font-family: Arial'>
  
  <tr>
  <td style='padding:10px;'>
<img src="https://gtrentapp.tybo.co.za/assets/images/logo.png" style="width: 4rem;"/>
</td>
  </tr>

<tr>
<td style='padding:0;'>
<p style="line-height: 1px; padding: 1px 10px;">
Hello ${customer.Name}
</p>
<p style="line-height: 1px; padding: 1px 10px;">

This is the confirmation that your compressor is booked with us.
</p>
<p style="line-height: normal; padding: 10px;">
Model:<b> ${task.Machine?.Model} </b><br />
Serial: <b>${task.Machine?.Serial}</b> <br />
Task: <b>${task.Description}</b><br />
Task Number: <b>${task.Name}</b><br />
</p>
<hr>
<p style="line-height: 7px; padding: 1px 10px;">

​Kindly Regards

${user.Name} <br /><br />
<b>C</b>: ${user.PhoneNumber || '--- ---- ---'} <br />
<b>E</b>: ${user.Email}
</p>

</td>
</tr>

</table>

  `;
  return email;
};


export const emailSig = (name = 'Grent Admin', phone = '+27 41 451 3701', email ='info@trentcompressors.com ') => {
  return `
  <div dir="ltr">
  <div><br /></div>
  Kindly Regards
  <div>
    <br />
    <div>${name}</div>
    <div><b>C: </b>${phone}</div>
    <div>
      <b>E:</b>
      <a href="${email}" target="_blank"
        >${email}</a
      >
    </div>
  </div>
</div>
  `
}