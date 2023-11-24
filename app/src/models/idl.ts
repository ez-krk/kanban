export type IDL = {
  version: "0.1.0";
  name: "kanban";
  instructions: [
    {
      name: "newDoer";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "doer";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
      ];
    },
    {
      name: "newTeam";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "doer";
          isMut: true;
          isSigner: false;
        },
        {
          name: "team";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
      ];
    },
    {
      name: "createTodo";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "doer";
          isMut: true;
          isSigner: false;
        },
        {
          name: "team";
          isMut: true;
          isSigner: false;
        },
        {
          name: "todo";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "title";
          type: "string";
        },
        {
          name: "content";
          type: "string";
        },
        {
          name: "status";
          type: "u8";
        },
        {
          name: "day";
          type: "u8";
        },
        {
          name: "seed";
          type: "u64";
        },
      ];
    },
    {
      name: "deleteTodo";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "doer";
          isMut: true;
          isSigner: false;
        },
        {
          name: "team";
          isMut: true;
          isSigner: false;
        },
        {
          name: "todo";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: "doneTodo";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "doer";
          isMut: true;
          isSigner: false;
        },
        {
          name: "team";
          isMut: true;
          isSigner: false;
        },
        {
          name: "todo";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: "updateTodo";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "doer";
          isMut: true;
          isSigner: false;
        },
        {
          name: "team";
          isMut: true;
          isSigner: false;
        },
        {
          name: "todo";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "title";
          type: "string";
        },
        {
          name: "content";
          type: "string";
        },
        {
          name: "status";
          type: "u8";
        },
        {
          name: "day";
          type: "u8";
        },
      ];
    },
    {
      name: "createInvite";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "doer";
          isMut: true;
          isSigner: false;
        },
        {
          name: "team";
          isMut: false;
          isSigner: false;
        },
        {
          name: "invite";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: "acceptInvite";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "doer";
          isMut: true;
          isSigner: false;
        },
        {
          name: "team";
          isMut: true;
          isSigner: false;
        },
        {
          name: "invite";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
  ];
  accounts: [
    {
      name: "Doer";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "team";
            type: "publicKey";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "created";
            type: "u64";
          },
          {
            name: "deleted";
            type: "u64";
          },
          {
            name: "done";
            type: "u64";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "Invite";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "doer";
            type: "publicKey";
          },
          {
            name: "team";
            type: "publicKey";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "Team";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "todos";
            type: "u64";
          },
          {
            name: "doers";
            type: "u64";
          },
          {
            name: "created";
            type: "u64";
          },
          {
            name: "deleted";
            type: "u64";
          },
          {
            name: "done";
            type: "u64";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "Todo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "team";
            type: "publicKey";
          },
          {
            name: "id";
            type: "u64";
          },
          {
            name: "title";
            type: "string";
          },
          {
            name: "content";
            type: "string";
          },
          {
            name: "status";
            type: "u8";
          },
          {
            name: "day";
            type: "u8";
          },
          {
            name: "done";
            type: "bool";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "seed";
            type: "u64";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
  ];
  errors: [
    {
      code: 6000;
      name: "NameEmpty";
      msg: "Name Empty";
    },
    {
      code: 6001;
      name: "NameTooLong";
      msg: "Name Too Long, Max 50 Characters";
    },
    {
      code: 6002;
      name: "TodoTitleEmpty";
      msg: "Todo Title Empty";
    },
    {
      code: 6003;
      name: "TodoTitleTooLong";
      msg: "Todo Title Too Long, Max 50 Characters";
    },
    {
      code: 6004;
      name: "TodoContentEmpty";
      msg: "Todo Content Empty";
    },
    {
      code: 6005;
      name: "TodoContentTooLong";
      msg: "Todo Content Too Long, Max 280 Characters";
    },
    {
      code: 6006;
      name: "StatusOutOfBounds";
      msg: "Status Out Of Bounds, 0 to 2";
    },
    {
      code: 6007;
      name: "WeekDayOutOfBounds";
      msg: "Week Day Out Of Bounds, 0 to 6";
    },
  ];
  metadata: {
    address: "WBAeGBvBarw39HZPfKjQnYKH57FcVJTmvGyDDSMwZwq";
  };
};

export const IDL: IDL = {
  version: "0.1.0",
  name: "kanban",
  instructions: [
    {
      name: "newDoer",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "doer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
      ],
    },
    {
      name: "newTeam",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "doer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "team",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
      ],
    },
    {
      name: "createTodo",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "doer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "team",
          isMut: true,
          isSigner: false,
        },
        {
          name: "todo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "content",
          type: "string",
        },
        {
          name: "status",
          type: "u8",
        },
        {
          name: "day",
          type: "u8",
        },
        {
          name: "seed",
          type: "u64",
        },
      ],
    },
    {
      name: "deleteTodo",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "doer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "team",
          isMut: true,
          isSigner: false,
        },
        {
          name: "todo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "doneTodo",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "doer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "team",
          isMut: true,
          isSigner: false,
        },
        {
          name: "todo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateTodo",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "doer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "team",
          isMut: true,
          isSigner: false,
        },
        {
          name: "todo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "content",
          type: "string",
        },
        {
          name: "status",
          type: "u8",
        },
        {
          name: "day",
          type: "u8",
        },
      ],
    },
    {
      name: "createInvite",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "doer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "team",
          isMut: false,
          isSigner: false,
        },
        {
          name: "invite",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "acceptInvite",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "doer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "team",
          isMut: true,
          isSigner: false,
        },
        {
          name: "invite",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "Doer",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "team",
            type: "publicKey",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "created",
            type: "u64",
          },
          {
            name: "deleted",
            type: "u64",
          },
          {
            name: "done",
            type: "u64",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "Invite",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "doer",
            type: "publicKey",
          },
          {
            name: "team",
            type: "publicKey",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "Team",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "todos",
            type: "u64",
          },
          {
            name: "doers",
            type: "u64",
          },
          {
            name: "created",
            type: "u64",
          },
          {
            name: "deleted",
            type: "u64",
          },
          {
            name: "done",
            type: "u64",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "Todo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "team",
            type: "publicKey",
          },
          {
            name: "id",
            type: "u64",
          },
          {
            name: "title",
            type: "string",
          },
          {
            name: "content",
            type: "string",
          },
          {
            name: "status",
            type: "u8",
          },
          {
            name: "day",
            type: "u8",
          },
          {
            name: "done",
            type: "bool",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "seed",
            type: "u64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "NameEmpty",
      msg: "Name Empty",
    },
    {
      code: 6001,
      name: "NameTooLong",
      msg: "Name Too Long, Max 50 Characters",
    },
    {
      code: 6002,
      name: "TodoTitleEmpty",
      msg: "Todo Title Empty",
    },
    {
      code: 6003,
      name: "TodoTitleTooLong",
      msg: "Todo Title Too Long, Max 50 Characters",
    },
    {
      code: 6004,
      name: "TodoContentEmpty",
      msg: "Todo Content Empty",
    },
    {
      code: 6005,
      name: "TodoContentTooLong",
      msg: "Todo Content Too Long, Max 280 Characters",
    },
    {
      code: 6006,
      name: "StatusOutOfBounds",
      msg: "Status Out Of Bounds, 0 to 2",
    },
    {
      code: 6007,
      name: "WeekDayOutOfBounds",
      msg: "Week Day Out Of Bounds, 0 to 6",
    },
  ],
  metadata: {
    address: "WBAeGBvBarw39HZPfKjQnYKH57FcVJTmvGyDDSMwZwq",
  },
};
