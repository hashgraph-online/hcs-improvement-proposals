import React from 'react';

export default function MultiLanguageSdkLinksTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Language</th>
          <th>Package</th>
          <th>Source</th>
          <th>Documentation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>TypeScript</td>
          <td><code>@hol-org/standards-sdk</code></td>
          <td>
            <a href="https://github.com/hashgraph-online/standards-sdk">
              hashgraph-online/standards-sdk
            </a>
          </td>
          <td>
            <a href="https://hol.org/docs/libraries/standards-sdk/">
              https://hol.org/docs/libraries/standards-sdk/
            </a>
          </td>
        </tr>
        <tr>
          <td>Go</td>
          <td><code>github.com/hashgraph-online/standards-sdk-go</code></td>
          <td>
            <a href="https://github.com/hashgraph-online/standards-sdk-go">
              hashgraph-online/standards-sdk-go
            </a>
          </td>
          <td>
            <a href="/docs/libraries/go-sdk/overview">
              /docs/libraries/go-sdk/overview
            </a>
          </td>
        </tr>
        <tr>
          <td>Python</td>
          <td><code>standards-sdk-py</code></td>
          <td>
            <a href="https://github.com/hashgraph-online/standards-sdk-py">
              hashgraph-online/standards-sdk-py
            </a>
          </td>
          <td>
            <a href="/docs/libraries/python-sdk/overview">
              /docs/libraries/python-sdk/overview
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
