# the following two lines give a two-line status, with the current window highlighted
hardstatus alwayslastline
hardstatus string '%{= kG}[%{G}%H%? %1`%?%{g}][%= %{= kw}%-w%{+b yk} %n*%t%?(%u)%? %{-}%+w %=%{g}][%{B}%m/%d %{W}%C%A%{g}]'

# huge scrollback buffer
defscrollback 5000

# no welcome message
startup_message off

# 256 colors
attrcolor b ".I"
termcapinfo xterm 'Co#256:AB=\E[48;5;%dm:AF=\E[38;5;%dm'
defbce on

# mouse tracking allows to switch region focus by clicking
mousetrack on
shell -$SHELL

# Bind C-a v to copy buffer to Mac OS X clipboard.
bind v eval "writebuf" "exec sh -c 'pbcopy < /tmp/screen-exchange'"
bindkey "^[OR" focus right
bindkey "^[OS" focus left
bindkey "^[[28~" focus up						# shift-F3 | focus up
bindkey "^[[29~" focus down						# shift-F4 | focus down


# Layouts
# [] == horizontal split
# {} == vertical split

# This is the start
screen
focus
split

<% _.each(spaces, function(space, index){ %>

# Row splitting
<% if( index == 0 ){ %>focus top<% } %>

# Cell splitting
<% _.each(space, function(cell, cellIndex){ %>
<% if(cellIndex !== space.length-1){ %>split -v<% } %>
<% if(cell.cwd){ %>chdir <%= cell.cwd.replace('~', process.env[(process.platform=='win32') ? 'USERPROFILE':'HOME']) %><% } %>
screen <% if(cell.name){ %> -t "<%= cell.name %>"<% } %>
<% if(cell.cmd){ %>stuff "<%= cell.cmd %>"<% } %>
focus <% if(cellIndex === space.length-1){ %>right<% } %>
<% }); %>

focus bottom
<% }); %>