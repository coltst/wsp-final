CREATE TABLE IF NOT EXISTS users (
    userid       INTEGER GENERATED ALWAYS AS idENTITY PRIMARY KEY,
    username     VARCHAR(25)    NOT NULL,
    creationdate TIMESTAMPTZ           NOT NULL,
    bio          TEXT           NOT NULL
);

CREATE TABLE IF NOT EXISTS post (
    postid   INTEGER GENERATED ALWAYS AS idENTITY PRIMARY KEY,
    creationdate TIMESTAMPTZ NOT NULL,
    title    TEXT     NOT NULL,
    content  TEXT     NOT NULL,
    userid INTEGER    NOT NULL,
    CONSTRAINT userpostFK FOREIGN KEY (userid) REFERENCES users (userid)
);

CREATE TABLE IF NOT EXISTS reaction (
    content VARCHAR(4) NOT NULL,
    postid  INTEGER    NOT NULL,
    userid  INTEGER    NOT NULL,
    CONSTRAINT userreactionFK FOREIGN KEY (userid) REFERENCES users (userid),
    CONSTRAINT postreactionFK FOREIGN KEY (postid) REFERENCES post (postid),
    CONSTRAINT reactionPK PRIMARY KEY (content, postid, userid)
);

CREATE TABLE IF NOT EXISTS reply (
    replyid INTEGER GENERATED ALWAYS AS idENTITY PRIMARY KEY,
    postid INTEGER NOT NULL,
    userid INTEGER NOT NULL,
    content TEXT NOT NULL,
    creationDate TIMESTAMPTZ NOT NULL,
    CONSTRAINT userreplyFK FOREIGN KEY (userid) REFERENCES users (userid),
    CONSTRAINT postreplyFK FOREIGN KEY (postid) REFERENCES post (postid)
);