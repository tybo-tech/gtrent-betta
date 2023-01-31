import { OrderModel } from 'src/models/order.model';
import { TaskModel } from 'src/models/task.model';

export const getAdminEmail = (task: TaskModel) => {
    const fsr = task.Fsr
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
            <td style='padding:10px; font-weight:700'>Distance</td>
            <td style='padding:10px'>${fsr.DistanceTravelled}</td>
        </tr>
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
            <td style='padding:10px'>${task.Customer?.PhoneNumber || '----'}</td>
        </tr>
        <tr>
            <td style='padding:10px; task-weight:700'> Email address</td>
            <td style='padding:10px'>${task.Customer?.Email || '----'}</td>
        </tr>
        <tr>
            <td style='padding:10px; font-weight:700'>Customer address</td>
            <td style='padding:10px'>${task.Customer?.AddressLineHome || '----'}</td>
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


    
    <h2>Signitures</h2>
      <table border=1 style='width:100%; border-collapse: collapse;'>
          <tr>
              <td style='padding:10px; font-weight:700'>Customer</td>
              <td style='padding:10px'>
              <img src="${fsr.CustomerSigniture}" style="width:12em" alt="">
              </td>
          </tr>
          <tr>
              <td style='padding:10px; font-weight:700'>Technicain</td>
              <td style='padding:10px'>
              <img src="${fsr.TechnicainSigniture}" style="width:12em" alt="">
              </td>
          </tr>
         
      </table>
    `;
  return email;
};
export const getAdminQouteEmail = (task: TaskModel) => {
    const fsr = task.Fsr
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
            <td style='padding:10px'>${task.Customer?.PhoneNumber || '----'}</td>
        </tr>
        <tr>
            <td style='padding:10px; task-weight:700'> Email address</td>
            <td style='padding:10px'>${task.Customer?.Email || '----'}</td>
        </tr>
        <tr>
            <td style='padding:10px; font-weight:700'>Customer address</td>
            <td style='padding:10px'>${task.Customer?.AddressLineHome || '----'}</td>
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
Hi ${task.Customer?.Name || 'Sir/Madam'} <br>

Thank you for working with us. We appreciate your business,
and we’ll do our best to continue to give you the kind of service you deserve.
Below is the summary of the service report.
</p>

    


    <h2> Work done</h2>
    <table border=1 style='width:100%; border-collapse: collapse;'>
        <tr>
            <td style='padding:10px'>${fsr.WorkDone || '----'}</td>
        </tr>
    </table>

  
      <h2>Other Info</h2>
      <table border=1 style='width:100%; border-collapse: collapse;'>
          <tr>
              <td style='padding:10px; font-weight:700'>Distance</td>
              <td style='padding:10px'>${fsr.DistanceTravelled}</td>
          </tr>
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
              <td style='padding:10px'>${task.Customer?.PhoneNumber || '----'}</td>
          </tr>
          <tr>
              <td style='padding:10px; font-weight:700'> Email address</td>
              <td style='padding:10px'>${task.Customer?.Email || '----'}</td>
          </tr>
          <tr>
              <td style='padding:10px; font-weight:700'>Customer address</td>
              <td style='padding:10px'>${task.Customer?.AddressLineHome || '----'}</td>
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
    
      </table>
  
  
      
      <h2>Signitures</h2>
      <table border=1 style='width:100%; border-collapse: collapse;'>
          <tr>
              <td style='padding:10px; font-weight:700'>Customer</td>
              <td style='padding:10px'>
              <img src="${fsr.CustomerSigniture}" style="width:12em" alt="">
              </td>
          </tr>
          <tr>
              <td style='padding:10px; font-weight:700'>Technicain</td>
              <td style='padding:10px'>
              <img src="${fsr.TechnicainSigniture}" style="width:12em" alt="">
              </td>
          </tr>
         
      </table>
      `;
    return email;
};
