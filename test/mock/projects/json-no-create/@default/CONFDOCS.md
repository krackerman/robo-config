## Plugin [mock-plugin](https://www.npmjs.com/package/mock-plugin)

- <a name="mock-plugin-task-idx-ref-json-no-createdefault">:open_file_folder:</a> <a href="#mock-plugin-task-ref-json-no-createdefault">`json-no-create/@default`</a>
  - <a name="mock-plugin-task-idx-ref-json-no-createtask">:clipboard:</a> <a href="#mock-plugin-task-ref-json-no-createtask">`json-no-create/task`</a>

### :open_file_folder: <a name="mock-plugin-task-ref-json-no-createdefault">json-no-create/@default</a> (<a href="#mock-plugin-task-idx-ref-json-no-createdefault">`index`</a>)

Task collection description.

<table>
  <tbody>
    <tr>
      <th>Targets</th>
    </tr>
    <tr>
      <td align="left" valign="top">
        <ul>
<code>project</code><br/>
<code>└─&nbsp;<a href="#mock-plugin-target-ref-no-create-targetjson">no-create-target.json</a></code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### :clipboard: <a name="mock-plugin-task-ref-json-no-createtask">json-no-create/task</a> (<a href="#mock-plugin-task-idx-ref-json-no-createtask">`index`</a>)

_Updating <a href="#mock-plugin-target-ref-no-create-targetjson">no-create-target.json</a> (if exists) using <a href="#mock-plugin-strat-ref-default-deep">default-deep</a>._

- Some purpose.

<table>
  <tbody>
    <tr>
      <th>Targets</th>
    </tr>
    <tr>
      <td align="left" valign="top">
        <ul>
<code>project</code><br/>
<code>└─&nbsp;<a href="#mock-plugin-target-ref-no-create-targetjson">no-create-target.json</a></code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

------

## Targets

### <a name="mock-plugin-target-ref-no-create-targetjson">no-create-target.json</a>  

:small_blue_diamond: `json`

*Short description for no-create-target.json*

Long description for no-create-target.json

------

## Strategies

### <a name="mock-plugin-strat-ref-default-deep">default-deep</a>  

:small_blue_diamond: `json`, `yml`

*Similar to `merge-deep`, but keeps existing values instead of overwriting.*

Useful to ensure specific keys of the target are present without overwriting existing content.

