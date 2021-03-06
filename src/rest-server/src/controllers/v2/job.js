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


// module dependencies
const yaml = require('js-yaml');
const status = require('statuses');
const asyncHandler = require('../../middlewares/v2/asyncHandler');
const {put, getJobConfig} = require('../../models/v2/job');
const createError = require('../../util/error');


const update = asyncHandler(async (req, res) => {
  const jobName = res.locals.protocol.name;
  const userName = req.user.username;
  const frameworkName = `${userName}~${jobName}`;
  await put(frameworkName, res.locals.protocol, req.body);
  res.status(status('Accepted')).json({
    status: status('Accepted'),
    message: `Update job ${jobName} for user ${userName} successfully.`,
  });
});

const getConfig = asyncHandler(async (req, res) => {
  try {
    const data = await getJobConfig(req.param.frameworkName);
    const type = req.accepts(['json', 'yaml']) || 'json';
    const body = type === 'json' ? JSON.stringify(data) : yaml.safeDump(data);
    return res.status(200).type(type).send(body);
  } catch (error) {
    if (error.message.startsWith('[WebHDFS] 404')) {
      throw createError('Not Found', 'NoJobConfigError', `Config of job ${req.job.name} is not found.`);
    } else {
      throw createError.unknown(error);
    }
  }
});

// module exports
module.exports = {
  update,
  getConfig,
};
