<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>群组成员管理</title>
</head>
<body class="no-skin">
	<%@ include file="/bxui/bxuihead.jsp"%>
	<script type="text/javascript" src="<%=toolkitPath%>/bxui/baosight-require.js"></script>
	<script type="text/javascript"  src="<%=toolkitPath%>/raising/backstage/privilege/RoleUser.js"></script>
    <link rel="stylesheet" href="<%=toolkitPath%>/bxui/other/css/style-frame-inner.css" />
	<%
		String groupName = request.getParameter("groupname");
		String groupId = request.getParameter("groupId");
		String id = request.getParameter("groupid");
	%>

	<input id="currentGroupId" class="hide" value="" />
	<div class="jqgridFrame contentFrame">
		<div class="page-content contentFrame" style="border: none;padding-bottom: 0">
			<!-- /section:settings.box -->
			<div class="page-header" style="height: 50px;">
				<h1 class="pull-left">
					角色成员管理 <small> <i class="ace-icon fa fa-angle-double-right"></i>
						增加、删除角色的成员信息
					</small>
				</h1>

			</div>

			<div class="row">

				<div class="col-xs-12 searchArea">

					<div id="alertdiv" class="alertdiv"></div>

					<div class="col-sm-4">
						<div class="row">
							<div class="form-group">
								<label
									class="searchLabel col-sm-4 control-label no-padding-right"
									for="inqu_status-groupname">角色名</label>
								<div class="col-sm-7 inputFrame">
									<input type="text" id="inqu_status-groupname"
										class="searchInput" readonly="readonly" value="<%=groupName%>" />
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-4">
						<div class="row">
							<div class="form-group">
								<label class="col-sm-5 control-label no-padding-right"
									for="inqu_status-username" style="width: 100px;">用户名</label>
								<div class="col-sm-7 inputFrame">
									<input type="text" id="inqu_status-username"
										class="searchInput" />
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-4 searchBtnPos">
						<button class="btn btn-sm btn-info btn-block pull-right searchBtn"
							onclick="on_query_click();">
							<div class="ace-icon fa fa-search"></div>
							<span>查询</span>
						</button>
					</div>
				</div>

				<input type="hidden" id="selectgroup" />

				<div class="col-xs-12">
					<div id="jqGrid" style="width: 100%; height: 95%; margin-top: 5px"></div>
				</div>
			</div>

		</div>
	</div>

	<!-- ----------------------------------信息弹出框---------------------------------------------------------->
	<div id="dialog-message" class="hide">
		<p class="bigger-110 bolder center grey">
			<br /> <b id="dialogInfo"></b>
		</p>
	</div>

</body>
</html>

