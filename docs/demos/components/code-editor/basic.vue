<template>
  <div>
    <el-form inline>
      <el-form-item label="样式">
        <kl-form-item v-model="theme" type="select" :data="[
          { value: 'vs-light', label: '明亮 - vs-light' },
          { value: 'vs-dark', label: '暗黑 - vs-dark' },
        ]" />
      </el-form-item>
      <el-form-item label="语言">
        <kl-form-item v-model="language" type="select" :data="store.map( v => ({ value: v.lang, label: v.lang }))" />
      </el-form-item>
      <el-form-item label="小地图">
        <kl-form-item v-model="minimap" type="switch" />
      </el-form-item>
    </el-form>
    <kl-code-editor v-model="code"
      :border="true" 
      :theme="theme" 
      :language="language" 
      :minimap="minimap" 
      @change="handleChange"/>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'

@Component<Demo>({
  mounted() {
    this.code = this.store?.find( v => v.lang == this.language )?.context??''
  },
})
export default class Demo extends Vue {

  @Provide()
  code: string =  ''

  @Provide()
  theme: string = 'vs-light'

  @Provide()
  language: string = 'html'

  @Provide()
  minimap: boolean = false

  @Provide()
  store = [
    {
      lang: 'html',
      context: `<!DOCTYPE HTML>
<!--Example of comments in HTML-->
<html>
<head>
  <!--This is the head section-->
  <title>HTML Sample</title>
  <meta charset="utf-8">

  <!--This is the style tag to set style on elements-->
  <style type="text/css">
    h1
    {
      font-family: Tahoma;
      font-size: 40px;
      font-weight: normal;
      margin: 50px;
      color: #a0a0a0;
    }

    h2
    {
      font-family: Tahoma;
      font-size: 30px;
      font-weight: normal;
      margin: 50px;
      color: #fff;
    }

    p
    {
      font-family: Tahoma;
      font-size: 17px;
      font-weight: normal;
      margin: 0px 200px;
      color: #fff;
    }

    div.Center
    {
      text-align: center;
    }

    div.Blue
    {
      padding: 50px;
      background-color: #7bd2ff;
    }

    button.Gray
    {
      font-family: Tahoma;
      font-size: 17px;
      font-weight: normal;
      margin-top: 100px;
      padding: 10px 50px;
      background-color: #727272;
      color: #fff;
      outline: 0;
          border: none;
          cursor: pointer;
    }

    button.Gray:hover
    {
      background-color: #898888;
    }

    button.Gray:active
    {
      background-color: #636161;
    }

  </style>

  <!--This is the script tag-->
  <script type="text/javascript">
    function ButtonClick(){
      // Example of comments in JavaScript
      window.alert("I'm an alert sample!");
    }
  <\/script>
</head>
<body>
  <!--This is the body section-->
  <div class="Center">
    <h1>NAME OF SITE</h1>
  </div>
  <div class="Center Blue">
      <h2>I'm h2 Header! Edit me in &lt;h2&gt;</h2>
      <p>
        I'm a paragraph! Edit me in &lt;p&gt;
        to add your own content and make changes to the style and font.
        It's easy! Just change the text between &lt;p&gt; ... &lt;/p&gt; and change the style in &lt;style&gt;.
        You can make it as long as you wish. The browser will automatically wrap the lines to accommodate the
        size of the browser window.
      </p>
      <button class="Gray" onclick="ButtonClick()">Click Me!</button>
  </div>
</body>
</html>
`
    },
    {
      lang: 'less',
      context: `@base: #f938ab;

.box-shadow(@style, @c) when (iscolor(@c)) {
  border-radius: @style @c;
}

.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}

.box { 
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  
  div {
    .box-shadow((0 0 5px), 30%);
  }
}

#header {
  h1 {
    font-size: 26px;
    font-weight: bold;
  }
  
  p { font-size: 12px;
    a { text-decoration: none;
      &:hover { border-width: 1px }
    }
  }
}

@the-border: 1px;
@base-color: #111;
@red:        #842210;

#header {
  color: (@base-color * 3);
  border-left: @the-border;
  border-right: (@the-border * 2);
}

#footer {
  color: (@base-color + #003300);
  border-color: desaturate(@red, 10%);
}
`
    },
    {
      lang: 'json',
      context: `{
  "type": "team",
  "test": {
    "testPage": "tools/testing/run-tests.htm",
    "enabled": true
  },
    "search": {
        "excludeFolders": [
      ".git",
      "node_modules",
      "tools/bin",
      "tools/counts",
      "tools/policheck",
      "tools/tfs_build_extensions",
      "tools/testing/jscoverage",
      "tools/testing/qunit",
      "tools/testing/chutzpah",
      "server.net"
        ]
    },
  "languages": {
    "vs.languages.typescript": {
      "validationSettings": [{
        "scope":"/",
        "noImplicitAny":true,
        "noLib":false,
        "extraLibs":[],
        "semanticValidation":true,
        "syntaxValidation":true,
        "codeGenTarget":"ES5",
        "moduleGenTarget":"",
        "lint": {
                    "emptyBlocksWithoutComment": "warning",
                    "curlyBracketsMustNotBeOmitted": "warning",
                    "comparisonOperatorsNotStrict": "warning",
                    "missingSemicolon": "warning",
                    "unknownTypeOfResults": "warning",
                    "semicolonsInsteadOfBlocks": "warning",
                    "functionsInsideLoops": "warning",
                    "functionsWithoutReturnType": "warning",
                    "tripleSlashReferenceAlike": "warning",
                    "unusedImports": "warning",
                    "unusedVariables": "warning",
                    "unusedFunctions": "warning",
                    "unusedMembers": "warning"
                }
      }, 
      {
        "scope":"/client",
        "baseUrl":"/client",
        "moduleGenTarget":"amd"
      },
      {
        "scope":"/server",
        "moduleGenTarget":"commonjs"
      },
      {
        "scope":"/build",
        "moduleGenTarget":"commonjs"
      },
      {
        "scope":"/node_modules/nake",
        "moduleGenTarget":"commonjs"
      }],
      "allowMultipleWorkers": true
    }
  }
}`
    },
    {
      lang: 'xml',
      context: `<?xml version="1.0"?>
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <connectionStrings>
    <add name="MyDB" 
      connectionString="value for the deployed Web.config file" 
      xdt:Transform="SetAttributes" xdt:Locator="Match(name)"/>
  </connectionStrings>
  <system.web>
    <customErrors defaultRedirect="GenericError.htm"
      mode="RemoteOnly" xdt:Transform="Replace">
      <error statusCode="500" redirect="InternalError.htm"/>
    </customErrors>
  </system.web>
</configuration>`
    },
    {
      lang: 'yaml',
      context: `%TAG ! tag:clarkevans.com,2002:
--- !shape
  # Use the ! handle for presenting
  # tag:clarkevans.com,2002:circle
- !circle
  center: &ORIGIN {x: 73, y: 129}
  radius: 7
- !line
  start: *ORIGIN
  finish: { x: 89, y: 102 }
- !label
  start: *ORIGIN
  color: 0xFFEEBB
  text: Pretty vector drawing.
`
    },
    {
      lang: 'javascript',
      context: `/*
  © Microsoft. All rights reserved.

  This library is supported for use in Windows Tailored Apps only.

  Build: 6.2.8100.0 
  Version: 0.5 
*/

(function (global, undefined) {
  "use strict";
  undefinedVariable = {};
  undefinedVariable.prop = 5;

  function initializeProperties(target, members) {
    var keys = Object.keys(members);
    var properties;
    var i, len;
    for (i = 0, len = keys.length; i < len; i++) {
      var key = keys[i];
      var enumerable = key.charCodeAt(0) !== /*_*/95;
      var member = members[key];
      if (member && typeof member === 'object') {
        if (member.value !== undefined || typeof member.get === 'function' || typeof member.set === 'function') {
          if (member.enumerable === undefined) {
            member.enumerable = enumerable;
          }
          properties = properties || {};
          properties[key] = member;
          continue;
        } 
      }
      if (!enumerable) {
        properties = properties || {};
        properties[key] = { value: member, enumerable: enumerable, configurable: true, writable: true }
        continue;
      }
      target[key] = member;
    }
    if (properties) {
      Object.defineProperties(target, properties);
    }
  }

  (function (rootNamespace) {

    // Create the rootNamespace in the global namespace
    if (!global[rootNamespace]) {
      global[rootNamespace] = Object.create(Object.prototype);
    }

    // Cache the rootNamespace we just created in a local variable
    var _rootNamespace = global[rootNamespace];
    if (!_rootNamespace.Namespace) {
      _rootNamespace.Namespace = Object.create(Object.prototype);
    }

    function defineWithParent(parentNamespace, name, members) {
      /// <summary locid="1">
      /// Defines a new namespace with the specified name, under the specified parent namespace.
      /// </summary>
      /// <param name="parentNamespace" type="Object" locid="2">
      /// The parent namespace which will contain the new namespace.
      /// </param>
      /// <param name="name" type="String" locid="3">
      /// Name of the new namespace.
      /// </param>
      /// <param name="members" type="Object" locid="4">
      /// Members in the new namespace.
      /// </param>
      /// <returns locid="5">
      /// The newly defined namespace.
      /// </returns>
      var currentNamespace = parentNamespace,
        namespaceFragments = name.split(".");

      for (var i = 0, len = namespaceFragments.length; i < len; i++) {
        var namespaceName = namespaceFragments[i];
        if (!currentNamespace[namespaceName]) {
          Object.defineProperty(currentNamespace, namespaceName, 
            { value: {}, writable: false, enumerable: true, configurable: true }
          );
        }
        currentNamespace = currentNamespace[namespaceName];
      }

      if (members) {
        initializeProperties(currentNamespace, members);
      }

      return currentNamespace;
    }

    function define(name, members) {
      /// <summary locid="6">
      /// Defines a new namespace with the specified name.
      /// </summary>
      /// <param name="name" type="String" locid="7">
      /// Name of the namespace.  This could be a dot-separated nested name.
      /// </param>
      /// <param name="members" type="Object" locid="4">
      /// Members in the new namespace.
      /// </param>
      /// <returns locid="5">
      /// The newly defined namespace.
      /// </returns>
      return defineWithParent(global, name, members);
    }

    // Establish members of the "WinJS.Namespace" namespace
    Object.defineProperties(_rootNamespace.Namespace, {

      defineWithParent: { value: defineWithParent, writable: true, enumerable: true },

      define: { value: define, writable: true, enumerable: true }

    });

  })("WinJS");

  (function (WinJS) {

    function define(constructor, instanceMembers, staticMembers) {
      /// <summary locid="8">
      /// Defines a class using the given constructor and with the specified instance members.
      /// </summary>
      /// <param name="constructor" type="Function" locid="9">
      /// A constructor function that will be used to instantiate this class.
      /// </param>
      /// <param name="instanceMembers" type="Object" locid="10">
      /// The set of instance fields, properties and methods to be made available on the class.
      /// </param>
      /// <param name="staticMembers" type="Object" locid="11">
      /// The set of static fields, properties and methods to be made available on the class.
      /// </param>
      /// <returns type="Function" locid="12">
      /// The newly defined class.
      /// </returns>
      constructor = constructor || function () { };
      if (instanceMembers) {
        initializeProperties(constructor.prototype, instanceMembers);
      }
      if (staticMembers) {
        initializeProperties(constructor, staticMembers);
      }
      return constructor;
    }

    function derive(baseClass, constructor, instanceMembers, staticMembers) {
      /// <summary locid="13">
      /// Uses prototypal inheritance to create a sub-class based on the supplied baseClass parameter.
      /// </summary>
      /// <param name="baseClass" type="Function" locid="14">
      /// The class to inherit from.
      /// </param>
      /// <param name="constructor" type="Function" locid="9">
      /// A constructor function that will be used to instantiate this class.
      /// </param>
      /// <param name="instanceMembers" type="Object" locid="10">
      /// The set of instance fields, properties and methods to be made available on the class.
      /// </param>
      /// <param name="staticMembers" type="Object" locid="11">
      /// The set of static fields, properties and methods to be made available on the class.
      /// </param>
      /// <returns type="Function" locid="12">
      /// The newly defined class.
      /// </returns>
      if (baseClass) {
        constructor = constructor || function () { };
        var basePrototype = baseClass.prototype;
        constructor.prototype = Object.create(basePrototype);
        Object.defineProperty(constructor.prototype, "_super", { value: basePrototype });
        Object.defineProperty(constructor.prototype, "constructor", { value: constructor });
        if (instanceMembers) {
          initializeProperties(constructor.prototype, instanceMembers);
        }
        if (staticMembers) {
          initializeProperties(constructor, staticMembers);
        }
        return constructor;
      } else {
        return define(constructor, instanceMembers, staticMembers);
      }
    }

    function mix(constructor) {
      /// <summary locid="15">
      /// Defines a class using the given constructor and the union of the set of instance members
      /// specified by all the mixin objects.  The mixin parameter list can be of variable length.
      /// </summary>
      /// <param name="constructor" locid="9">
      /// A constructor function that will be used to instantiate this class.
      /// </param>
      /// <returns locid="12">
      /// The newly defined class.
      /// </returns>
      constructor = constructor || function () { };
      var i, len;
      for (i = 0, len = arguments.length; i < len; i++) {
        initializeProperties(constructor.prototype, arguments[i]);
      }
      return constructor;
    }

    // Establish members of "WinJS.Class" namespace
    WinJS.Namespace.define("WinJS.Class", {
      define: define,
      derive: derive,
      mix: mix
    });

  })(WinJS);

})(this);`
    },
    {
      lang: 'typescript',
      context: `/* Game of Life
 * Implemented in TypeScript
 * To learn more about TypeScript, please visit http://www.typescriptlang.org/
 */

namespace Conway {

  export class Cell {
    public row: number;
    public col: number;
    public live: boolean;

    constructor(row: number, col: number, live: boolean) {
      this.row = row;
      this.col = col;
      this.live = live;
    }
  }

  export class GameOfLife {
    private gridSize: number;
    private canvasSize: number;
    private lineColor: string;
    private liveColor: string;
    private deadColor: string;
    private initialLifeProbability: number;
    private animationRate: number;
    private cellSize: number;
    private context: CanvasRenderingContext2D;
    private world;


    constructor() {
      this.gridSize = 50;
      this.canvasSize = 600;
      this.lineColor = '#cdcdcd';
      this.liveColor = '#666';
      this.deadColor = '#eee';
      this.initialLifeProbability = 0.5;
      this.animationRate = 60;
      this.cellSize = 0;
      this.world = this.createWorld();
      this.circleOfLife();
    }

    public createWorld() {
      return this.travelWorld( (cell : Cell) =>  {
        cell.live = Math.random() < this.initialLifeProbability;
        return cell;
      });
    }

    public circleOfLife() : void {
      this.world = this.travelWorld( (cell: Cell) => {
        cell = this.world[cell.row][cell.col];
        this.draw(cell);
        return this.resolveNextGeneration(cell);
      });
      setTimeout( () => {this.circleOfLife()}, this.animationRate);
    }

    public resolveNextGeneration(cell : Cell) {
      var count = this.countNeighbors(cell);
      var newCell = new Cell(cell.row, cell.col, cell.live);
      if(count < 2 || count > 3) newCell.live = false;
      else if(count == 3) newCell.live = true;
      return newCell;
    }

    public countNeighbors(cell : Cell) {
      var neighbors = 0;
      for(var row = -1; row <=1; row++) {
        for(var col = -1; col <= 1; col++) {
          if(row == 0 && col == 0) continue;
          if(this.isAlive(cell.row + row, cell.col + col)) {
            neighbors++;
          }
        }
      }
      return neighbors;
    }

    public isAlive(row : number, col : number) {
      if(row < 0 || col < 0 || row >= this.gridSize || col >= this.gridSize) return false;
      return this.world[row][col].live;
    }

    public travelWorld(callback) {
      var result = [];
      for(var row = 0; row < this.gridSize; row++) {
        var rowData = [];
        for(var col = 0; col < this.gridSize; col++) {
          rowData.push(callback(new Cell(row, col, false)));
        }
        result.push(rowData);
      }
      return result;
    }

    public draw(cell : Cell) {
      if(this.context == null) this.context = this.createDrawingContext();
      if(this.cellSize == 0) this.cellSize = this.canvasSize/this.gridSize;

      this.context.strokeStyle = this.lineColor;
      this.context.strokeRect(cell.row * this.cellSize, cell.col*this.cellSize, this.cellSize, this.cellSize);
      this.context.fillStyle = cell.live ? this.liveColor : this.deadColor;
      this.context.fillRect(cell.row * this.cellSize, cell.col*this.cellSize, this.cellSize, this.cellSize);
    }

    public createDrawingContext() {
      var canvas = <HTMLCanvasElement> document.getElementById('conway-canvas');
      if(canvas == null) {
          canvas = document.createElement('canvas');
          canvas.id = 'conway-canvas';
          canvas.width = this.canvasSize;
          canvas.height = this.canvasSize;
          document.body.appendChild(canvas);
      }
      return canvas.getContext('2d');
    }
  }
}

var game = new Conway.GameOfLife();
`
    },
    {
      lang: 'sql',
      context: `CREATE TABLE dbo.EmployeePhoto
(
    EmployeeId INT NOT NULL PRIMARY KEY,
    Photo VARBINARY(MAX) FILESTREAM NULL,
    MyRowGuidColumn UNIQUEIDENTIFIER NOT NULL ROWGUIDCOL
                    UNIQUE DEFAULT NEWID()
);

GO

/*
text_of_comment
/* nested comment */
*/

-- line comment

CREATE NONCLUSTERED INDEX IX_WorkOrder_ProductID
    ON Production.WorkOrder(ProductID)
    WITH (FILLFACTOR = 80,
        PAD_INDEX = ON,
        DROP_EXISTING = ON);
GO

WHILE (SELECT AVG(ListPrice) FROM Production.Product) < $300
BEGIN
   UPDATE Production.Product
      SET ListPrice = ListPrice * 2
   SELECT MAX(ListPrice) FROM Production.Product
   IF (SELECT MAX(ListPrice) FROM Production.Product) > $500
      BREAK
   ELSE
      CONTINUE
END
PRINT 'Too much for the market to bear';

MERGE INTO Sales.SalesReason AS [Target]
USING (VALUES ('Recommendation','Other'), ('Review', 'Marketing'), ('Internet', 'Promotion'))
       AS [Source] ([NewName], NewReasonType)
ON [Target].[Name] = [Source].[NewName]
WHEN MATCHED
THEN UPDATE SET ReasonType = [Source].NewReasonType
WHEN NOT MATCHED BY TARGET
THEN INSERT ([Name], ReasonType) VALUES ([NewName], NewReasonType)
OUTPUT $action INTO @SummaryOfChanges;

SELECT ProductID, OrderQty, SUM(LineTotal) AS Total
FROM Sales.SalesOrderDetail
WHERE UnitPrice < $5.00
GROUP BY ProductID, OrderQty
ORDER BY ProductID, OrderQty
OPTION (HASH GROUP, FAST 10);
`
    },
    {
      lang: 'shell',
      context: `#!/bin/bash
# Simple line count example, using bash
#
# Bash tutorial: http://linuxconfig.org/Bash_scripting_Tutorial#8-2-read-file-into-bash-array
# My scripting link: http://www.macs.hw.ac.uk/~hwloidl/docs/index.html#scripting
#
# Usage: ./line_count.sh file
# -----------------------------------------------------------------------------

# Link filedescriptor 10 with stdin
exec 10<&0
# stdin replaced with a file supplied as a first argument
exec < $1
# remember the name of the input file
in=$1

# init
file="current_line.txt"
let count=0

# this while loop iterates over all lines of the file
while read LINE
do
    # increase line counter
    ((count++))
    # write current line to a tmp file with name $file (not needed for counting)
    echo $LINE > $file
    # this checks the return code of echo (not needed for writing; just for demo)
    if [ $? -ne 0 ]
     then echo "Error in writing to file \$\{file\}; check its permissions!"
    fi
done

echo "Number of lines: $count"
echo "The last line of the file is: \`cat \$\{file\}\`"

# Note: You can achieve the same by just using the tool wc like this
echo "Expected number of lines: \`wc -l \$in\`"

# restore stdin from filedescriptor 10
# and close filedescriptor 10
exec 0<&10 10<&-`
    },
    {
      lang: 'bat',
      context: `rem *******Begin Comment**************
rem This program starts the superapp batch program on the network,
rem directs the output to a file, and displays the file
rem in Notepad.
rem *******End Comment**************
@echo off
if exist C:\\output.txt goto EMPTYEXISTS
setlocal
	path=g:\\programs\\superapp;%path%
	call superapp>C:\\output.txt
endlocal
:EMPTYEXISTS
start notepad c:\\output.txt`
    },
    {
      lang: 'dockerfile',
      context: `FROM mono:3.12

ENV KRE_FEED https://www.myget.org/F/aspnetvnext/api/v2
ENV KRE_USER_HOME /opt/kre

RUN apt-get -qq update && apt-get -qqy install unzip 

ONBUILD RUN curl -sSL https://raw.githubusercontent.com/aspnet/Home/dev/kvminstall.sh | sh
ONBUILD RUN bash -c "source $KRE_USER_HOME/kvm/kvm.sh \\
    && kvm install latest -a default \\
    && kvm alias default | xargs -i ln -s $KRE_USER_HOME/packages/{} $KRE_USER_HOME/packages/default"

# Install libuv for Kestrel from source code (binary is not in wheezy and one in jessie is still too old)
RUN apt-get -qqy install \\
    autoconf \\
    automake \\
    build-essential \\
    libtool 
RUN LIBUV_VERSION=1.0.0-rc2 \\
    && curl -sSL https://github.com/joyent/libuv/archive/v\$\{LIBUV_VERSION\}.tar.gz | tar zxfv - -C /usr/local/src \\
    && cd /usr/local/src/libuv-$LIBUV_VERSION \\
    && sh autogen.sh && ./configure && make && make install \\
    && rm -rf /usr/local/src/libuv-$LIBUV_VERSION \\
    && ldconfig

ENV PATH $PATH:$KRE_USER_HOME/packages/default/bin

# Extra things to test
RUN echo "string at end"
RUN echo must work 'some str' and some more
RUN echo hi this is # not a comment
RUN echo 'String with \$\{VAR\} and another $one here'`
    },
    {
      lang: 'python',
      context: `import banana


class Monkey:
    # Bananas the monkey can eat.
    capacity = 10
    def eat(self, n):
        """Make the monkey eat n bananas!"""
        self.capacity -= n * banana.size

    def feeding_frenzy(self):
        self.eat(9.25)
        return "Yum yum"
`
    }
  ]

  @Watch('language')
  onLanguageChange (val: string, oldVal: string) {
    if (val === oldVal) return
    this.code = this.store?.find( v => v.lang == val )?.context??''
  }

  getLanguage () {
    this.store.map( v => ({ value: v.lang, label: v.lang }))
  }

  handleChange (value: string) {
    // console.log(value)
  }
}
</script>