// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, {useRef, useContext, useMemo} from 'react';
import {Modal, TextField, FontClassNames, PrimaryButton, DefaultButton, Stack, StackItem, Checkbox, Dropdown} from 'office-ui-fabric-react';
import PropTypes from 'prop-types';
import c from 'classnames';
import t from '../../../components/tachyons.scss';

import Context from './Context';

export default function UserEditor({user: {username = '', admin = '', virtualCluster = ''}, isOpen = false, isCreate = true, updateUserAccount, updateUserVC, hideEditUser}) {
  const {allUsers, allVCs} = useContext(Context);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  // const chkAdmin = useRef(null);
  // const chkVc = useRef(null);

  const parseVirtualClusterString = (virtualClusterString) => {
    let vcs = [];
    if (virtualClusterString) {
      virtualClusterString.split(',').map((vc) => vc.trim()).forEach((vc) => {
        if (vc) {
          if (allVCs.indexOf(vc) != -1) {
            vcs.push(vc);
          }
        }
      });
    }
    return vcs.sort();
  };
  const oldVCs = parseVirtualClusterString(virtualCluster);
  // let newVirtual;


  // const handleUpdateAccount = (event) => {
  //   const password = inputPassword.current.value;
  //   const isAdmin = chkAdmin.current.checked;
  //   updateUserAccount(username, password, isAdmin);
  //   event.preventDefault();
  // };

  // const handleUpdateUserVC = (event) => {
  //   const vcList = chkVc.current.value;
  //   updateUserVC(username, vcList);
  //   event.preventDefault();
  // };

  const tdPaddingStyle = c(t.pa3);
  const tdLabelStyle = c(tdPaddingStyle, t.tr);

  /**
   * @type {import('office-ui-fabric-react').IDropdownOption[]}
   */
  const vcsOptions = allVCs.map((vc) => {
    return {key: vc, text: vc};
  });

  return (
    <Modal
      isOpen={isOpen}
      styles={{main: [{maxWidth: '430px'}, t.w90]}}
    >
      <div className={c(t.pa4)}>
        <form>
          <div className={c(FontClassNames.mediumPlus)}>
            Edit user
        </div>
          <div style={{margin: '20px 0px'}}>
            <table className={c(t.mlAuto, t.mrAuto)}>
              <tbody>
                <tr>
                  <td className={tdLabelStyle}>
                    Name
                </td>
                  <td className={tdPaddingStyle} style={{width: '270px'}}>
                    <TextField
                      componentRef={usernameRef}
                      disabled={!isCreate}
                      defaultValue={username}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={tdLabelStyle}>
                    Password
                  </td>
                  <td className={tdPaddingStyle}>
                    <TextField
                      componentRef={passwordRef}
                      type='password'
                      placeholder={isCreate ? '' : '******'}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={tdLabelStyle}>
                    Virtual clusters
                  </td>
                  <td className={tdPaddingStyle}>
                    <Dropdown
                      multiSelect
                      options={vcsOptions}
                      defaultSelectedKeys={oldVCs}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={tdLabelStyle}>
                    Admin user
                  </td>
                  <td className={tdPaddingStyle}>
                    <Stack horizontal={true} gap='16px'>
                      <StackItem>
                        <Checkbox></Checkbox>
                      </StackItem>
                      <StackItem>
                        <span className={c(FontClassNames.xSmall, t.i)}>
                          Admin user default own all virtual clusters
                        </span>
                      </StackItem>
                    </Stack>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{marginTop: '32px', marginLeft: 'auto', marginRight: 'auto'}}>
            <Stack horizontal={true} horizontalAlign='center' gap='8px'>
              <StackItem>
                <PrimaryButton>
                  Save
                </PrimaryButton>
              </StackItem>
              <StackItem>
                <DefaultButton>
                  Cancel
                </DefaultButton>
              </StackItem>
            </Stack>
          </div>
        </form>
      </div>
    </Modal>
  );
}

UserEditor.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    admin: PropTypes.string,
    virtualCluster: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  isCreate: PropTypes.bool,
  updateUserAccount: PropTypes.func,
  updateUserVC: PropTypes.func,
  hideEditUser: PropTypes.func,
};


// onChange={(_event, option, _index) => {
//   if (option.selected) {
//     vcs.push(option.text);
//   } else {
//     vcs.splice(vcs.indexOf(option.text), 1);
//   }
//   userInfo['virtual cluster'] = vcs.join(',');
// }}
// onRenderTitle={(_options) => {
//   return (
//     <div>
//       {getDisplayVirtualClusterString(userInfo['virtual cluster'])}
//     </div>
//   );
// }}

        // <form onSubmit={onSubmit}>
        //   <div className={c(t.center, t.mt3)}>
        //     <TextField componentRef={usernameRef} label='Username'/>
        //   </div>
        //   <div className={c(t.center, t.mt3)}>
        //     <TextField
        //       componentRef={passwordRef}
        //       label='Password'
        //       type='password'
        //     />
        //   </div>
        //   <div className={c(t.center, t.mt4, t.tc)}>
        //     <PrimaryButton
        //       text="Sign in"
        //       type="submit"
        //       styles={{root: [t.w4]}}
        //       disabled={lock}
        //     />
        //   </div>
        // </form>


// <div className="modal-content">
//         <div className="modal-header">
//           <h4 className="modal-title">Edit information of {username}</h4>
//         </div>
//         <div className="modal-body">
//           <div className="box-header with-border user-edit-border">
//             <h3 className="box-title">Change Userinfo</h3>
//           </div>
//           <form id="form-update-account" className="form-register" onSubmit={handleUpdateAccount} >
//             <label htmlFor="inputPassword" className="sr-only">Password</label>
//             <input type="password" name="password" ref={inputPassword} id="update-account-input-password" className="form-control" placeholder="******" />
//             <div className="checkbox">
//               <label>
//                 <input type="checkbox" name="admin" ref={chkAdmin} defaultChecked={admin === 'true' ? true : false} />
//                 Admin user
//             </label>
//             </div>
//             <button className="btn btn-lg btn-primary btn-block" type="button" onClick={handleUpdateAccount}>Change Userinfo</button>
//           </form>
//           {admin !== 'true' &&
//             <React.Fragment>
//               <div className="box-header with-border user-edit-border">
//                 <h3 className="box-title">Update Virtual Clusters</h3>
//               </div>
//               <form id="form-update-virtual-cluster" className="form-register" onSubmit={handleUpdateUserVC}>
//                 <label htmlFor="inputVirtualCluster" className="sr-only">VirtualCluster</label>
//                 <input type="text" name="virtualCluster" ref={chkVc} id="update-virtual-cluster-input-virtualCluster" className="form-control"
//                   placeholder="Virtual Clusters (e.g. vc1,vc2)" defaultValue={virtualCluster} />
//                 <button className="btn btn-lg btn-primary btn-block" type="button" onClick={handleUpdateUserVC}> Update Virtual Clusters</button>
//               </form>
//             </React.Fragment>
//           }
//           <div className="box-header with-border user-edit-border">
//             <h3 className="box-title">Update Github PAT</h3>
//           </div>
//           <form id="form-update-github-token" className="form-register" onSubmit={handleUpdateGithubPAT}>
//             <label htmlFor="inputGithubPAT" className="sr-only">GithubPAT</label>
//             <input type="text" name="githubPAT" ref={chkGithubPAT} id="update-github-token-input-githubPAT" className="form-control"
//               placeholder={hasGithubPAT ? '******' : 'N/A'} />
//             <button className="btn btn-lg btn-primary btn-block" type="button" onClick={handleUpdateGithubPAT}>Update Github PAT</button>
//           </form>
//         </div>
//         <div className="modal-footer">
//           <button type="button" className="btn btn-default" onClick={hideEditUser}>Close</button>
//         </div>
//       </div>
