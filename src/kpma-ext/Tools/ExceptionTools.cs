using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Tools
{
    public static class ExceptionTools
    {
		/// <summary>
		/// Получить самое глубокое вложенное исключение
		/// </summary>
		/// <param name="ex">Исходное исключение</param>
		/// <returns>Искомое исключение</returns>
		public static Exception GetInnerException(Exception ex)
		{
			if (ex.InnerException == null)
			{
				return ex;
			}

			var ie = ex.InnerException;
			while (ie.InnerException != null)
			{
				ie = ie.InnerException;
			}

			return ie;
		}


		public static string GetExceptionMessage(Exception ex)
		{
			var exi = GetInnerException(ex);

			if (ex.Message.Contains("Violation of PRIMARY KEY constraint"))
			{
				return "Запись с такими значениями уже существует.";
			}
			else
			{
				return "Ошибка программы. Обратитесь в службу поддержки.";
			}
		}
	}
}
